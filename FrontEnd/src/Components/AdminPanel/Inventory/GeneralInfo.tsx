import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Typography,
  Box,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { IFormData, IGeneralInfo } from "../../../Model/Inventory";
import { airlineList } from "../../../Constant/AirlineList";
import { formatDayJsDate } from "../../../Utils/Constant";
import "./GeneralInfo.css";

function sortAscending(a: any, b: any) {
  return a.Name.localeCompare(b.Name);
}

const options = airlineList.sort(sortAscending);

interface IGeneralInfoProps {
  formData: IFormData;
  setFormData: any;
  isReturnInfoDetail?: boolean;
}

const GeneralInfo = (props: IGeneralInfoProps) => {
  const { formData, setFormData, isReturnInfoDetail } = props;

  useEffect(() => {
    setDefaultEndDate();
  }, [formData.generalInfo.startDate]);

  const setDefaultEndDate = () => {
    let endDate = new Date(formData.generalInfo.startDate as any);
    endDate.setDate(endDate.getDate() + 1);
    setFormData((prevNestedObject: IFormData) => ({
      ...prevNestedObject,
      ["generalInfo"]: {
        ...prevNestedObject["generalInfo"],
        ["endDate"]: dayjs(endDate),
      },
    }));
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevNestedObject: IFormData) => ({
      ...prevNestedObject,
      ["generalInfo"]: {
        ...prevNestedObject["generalInfo"],
        [name as string]: value,
      },
    }));
  };

  const handleSelectChange =
    (name: string) => (event: React.ChangeEvent<{}>, value: any) => {
      setFormData((prevNestedObject: IFormData) => ({
        ...prevNestedObject,
        ["generalInfo"]: {
          ...prevNestedObject["generalInfo"],
          [name as string]: value?.Name ?? "",
        },
      }));
    };

  const onDateChange = (date: Dayjs | null, field: keyof IGeneralInfo) => {
    setFormData((prevNestedObject: IFormData) => ({
      ...prevNestedObject,
      ["generalInfo"]: {
        ...prevNestedObject["generalInfo"],
        [field]: formatDayJsDate(date),
      },
    }));
  };

  console.log("formData", formData);

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="general-info-content"
        id="general-info-header"
      >
        <Typography variant="h6" color="#888">
          General Information
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            minWidth: "280px",
            background: "white",
            padding: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Autocomplete
                options={options}
                getOptionLabel={(option) => `${option.Name} (${option.ICAO})`}
                onChange={handleSelectChange("airline")}
                value={options["airline" as any]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Airline"
                    variant="outlined"
                    fullWidth
                    size="small"
                    required
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props} style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <span>{option.Name}</span>
                      <span style={{ fontSize: "small" }}>{option.ICAO}</span>
                    </div>
                  </li>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                label="Airline Number"
                name="airlineNumber"
                required
                value={formData.generalInfo.airlineNumber}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                label="Return Airline Number"
                name="returnAirlineNumber"
                required
                value={formData.generalInfo.returnAirlineNumber}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="grid-date-picker"
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date *"
                  value={formData.generalInfo.startDate}
                  onChange={(newValue) => onDateChange(newValue, "startDate")}
                  format="DD/MM/YYYY"
                  views={["day", "month", "year"]}
                  slotProps={{ textField: { size: "small" } }}
                  minDate={dayjs(new Date())}
                />
              </LocalizationProvider>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="grid-date-picker"
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="End Date *"
                  value={formData.generalInfo.endDate}
                  onChange={(newValue) => onDateChange(newValue, "endDate")}
                  format="DD/MM/YYYY"
                  views={["day", "month", "year"]}
                  slotProps={{ textField: { size: "small" } }}
                  minDate={dayjs(formData.generalInfo.startDate ?? new Date())}
                />
              </LocalizationProvider>
            </Grid>
            {isReturnInfoDetail && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  fullWidth
                  label="Trip Duration"
                  name="tripDuration"
                  value={formData.generalInfo.tripDuration}
                  onChange={handleChange}
                  size="small"
                  required
                />
              </Grid>
            )}
          </Grid>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default GeneralInfo;
