import React, {
  useState,
  lazy,
  Suspense,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  InputLabel,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import { IFilters, IFiltersError, ITravelers } from "../../Model/Filters";
import { allCities } from "../../Constant/CitiesList";
import "./FilterBar.css";
const PassengerSelector = lazy(() => import("./PassengerSelector"));

function sortAscending(a: any, b: any) {
  return a?.city?.localeCompare(b.city);
}

const options = allCities.filter((row: any) => row?.city).sort(sortAscending);

interface IFilterBar {
  newSelectedDate: (selectedDate: Dayjs | null) => void;
  selectedPassengers?: (travelers: ITravelers) => void;
  filters: IFilters;
  setFilters: Dispatch<SetStateAction<IFilters>>;
  filtersError: IFiltersError;
  setFiltersError: Dispatch<SetStateAction<IFiltersError>>;
}

const FilterBar = (props: IFilterBar) => {
  const {
    newSelectedDate,
    selectedPassengers,
    filters,
    setFilters,
    filtersError,
    setFiltersError,
  } = props;
  const currentDate = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;
  const [selectedReturnDate, setSelectedReturnDate] = useState<Dayjs | null>(
    dayjs(currentDate)
  );
  const navigate = useNavigate();

  const onDateChange = (newValue: Dayjs | null, name: keyof IFilters) => {
    newSelectedDate(newValue);
    setFilters((prevFilters: IFilters) => ({
      ...prevFilters,
      [name]: newValue,
    }));
  };

  const handleChange = (event: any) => {
    setFilters((prevFilters: IFilters) => ({
      ...prevFilters,
      ["selectedTrip"]: event.target.value,
    }));
  };

  const handleSelectChange =
    (name: string) => (event: React.ChangeEvent<{}>, value: any) => {
      setFilters((prevFilters: IFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    };
  console.log("error", filtersError);
  const onSearchFlightClick = () => {
    if (filters.cityFrom) {
      setFiltersError((prevFiltersError: IFiltersError) => ({
        ...prevFiltersError,
        ["isErrorCityFrom"]: false,
      }));
    } else {
      setFiltersError((prevFiltersError: IFiltersError) => ({
        ...prevFiltersError,
        ["isErrorCityFrom"]: true,
      }));
    }

    if (filters.cityTo) {
      setFiltersError((prevFiltersError: IFiltersError) => ({
        ...prevFiltersError,
        ["isErrorCityTo"]: false,
      }));
    } else {
      setFiltersError((prevFiltersError: IFiltersError) => ({
        ...prevFiltersError,
        ["isErrorCityTo"]: true,
      }));
    }

    if (filters.departDate === null) {
      setFiltersError((prevFiltersError: IFiltersError) => ({
        ...prevFiltersError,
        ["isErrorDepartDate"]: true,
      }));
    } else {
      setFiltersError((prevFiltersError: IFiltersError) => ({
        ...prevFiltersError,
        ["isErrorDepartDate"]: false,
      }));
    }

    if (!filters.cityFrom || !filters.cityTo || filters.departDate === null) {
      return;
    }

    navigate(`/search-flight`);
  };
  console.log("filtersssss", filters);
  return (
    <div className="filter-bar">
      <div className="flex-row-center-wrap">
        <RadioGroup
          name="trip"
          value={filters.selectedTrip}
          onChange={handleChange}
          row
          className="margin-right-22"
        >
          <FormControlLabel
            value="round"
            control={<Radio />}
            label="Round trip"
          />
          <FormControlLabel
            value="oneWay"
            control={<Radio />}
            label="One way trip"
          />
        </RadioGroup>
        <Suspense fallback={<></>}>
          <PassengerSelector selectedPassengers={selectedPassengers} />
        </Suspense>
      </div>
      <div className="flex-row-center-wrap">
        <Autocomplete
          options={options}
          getOptionLabel={(option) => `${option.city} (${option.code})`}
          onChange={handleSelectChange("cityFrom")}
          value={options["cityFrom" as any]}
          className="select-item margin-top-16 margin-right-22"
          renderInput={(params) => (
            <TextField
              {...params}
              label="From"
              variant="outlined"
              fullWidth
              size="small"
              required
              InputLabelProps={{ style: { color: "white" } }}
              sx={{ minWidth: 200 }}
              placeholder="Departure"
              error={filtersError.isErrorCityFrom}
              helperText={
                filtersError.isErrorCityFrom ? "This field is required" : ""
              }
            />
          )}
          renderOption={(props, option) => (
            <li
              {...props}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span>{option.city}</span>
                <span style={{ fontSize: "small" }}>{option.code}</span>
              </div>
              <div style={{ fontSize: "small", fontWeight: "600" }}>
                {option.airport}
              </div>
            </li>
          )}
        />
        <Autocomplete
          options={options}
          getOptionLabel={(option) => `${option.city} (${option.code})`}
          onChange={handleSelectChange("cityTo")}
          value={options["cityTo" as any]}
          className="select-item margin-top-16 margin-right-22"
          sx={{ color: "white" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="To"
              variant="outlined"
              fullWidth
              size="small"
              required
              InputLabelProps={{ style: { color: "white" } }}
              sx={{ minWidth: 200 }}
              placeholder="Arrival"
              error={filtersError.isErrorCityTo}
              helperText={
                filtersError.isErrorCityTo ? "This field is required" : ""
              }
            />
          )}
          renderOption={(props, option) => (
            <li
              {...props}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span>{option.city}</span>
                <span style={{ fontSize: "small" }}>{option.code}</span>
              </div>
              <div style={{ fontSize: "small", fontWeight: "600" }}>
                {option.airport}
              </div>
            </li>
          )}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex-column-start">
            <DatePicker
              label="Depart on"
              className="date-picker margin-top-16"
              value={filters.departDate}
              onChange={(newValue) => onDateChange(newValue, "departDate")}
            />
            {filtersError.isErrorDepartDate && (
              <Typography
                variant="caption"
                color="error"
                style={{ marginTop: "2px" }}
              >
                This field is required
              </Typography>
            )}
          </div>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Return on"
            className="date-picker margin-top-16"
            value={filters.returnDate}
            onChange={(newValue) => onDateChange(newValue, "returnDate")}
            disabled={filters.selectedTrip?.toLowerCase() === "oneway"}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          className="search-flight margin-top-16"
          onClick={onSearchFlightClick}
        >
          Search Flights
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
