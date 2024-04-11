import React, { useState } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IFormData } from "../../../Model/Inventory";
import { allCities } from "../../../Constant/CitiesList";

function sortAscending(a: any, b: any) {
  return a?.city?.localeCompare(b.city);
}

const options = allCities.filter((row) => row?.city).sort(sortAscending);

interface IReturnInfoProps {
  formData: IFormData;
  setFormData: any;
}

const ReturnInfo = (props: IReturnInfoProps) => {
  const { formData, setFormData } = props;

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevState: IFormData) => ({
      ...prevState,
      ["returnInfo"]: {
        ...prevState["returnInfo"],
        [name as string]: type === "checkbox" ? checked : value,
      },
    }));

    if (name === "departureTime" || name === "arrivalTime") {
      calculateDuration(name, value);
    }
  };

  const handleSelectChange =
    (name: string) => (event: React.ChangeEvent<{}>, value: any) => {
      setFormData((prevNestedObject: IFormData) => ({
        ...prevNestedObject,
        ["returnInfo"]: {
          ...prevNestedObject["returnInfo"],
          [name as string]: {
            city: value?.city ?? "",
            code: value?.code ?? "",
            airport: value?.airport ?? "",
          },
        },
      }));
    };

  const calculateDuration = (name: string, value: string) => {
    let departureTime =
      name === "departureTime" ? value : formData.departureInfo.departureTime;
    let arrivalTime =
      name === "arrivalTime" ? value : formData.departureInfo.arrivalTime;
    const hour1 = departureTime.split(":")[0];
    const hour2 = arrivalTime.split(":")[0];
    const min1 = departureTime.split(":")[1];
    const min2 = arrivalTime.split(":")[1];

    let differenceInHour: any = parseFloat(hour2) - parseFloat(hour1);
    let differenceInMinute: any = parseFloat(min2) - parseFloat(min1);
    if (differenceInHour < 0) {
      differenceInHour += 24;
    }
    if (differenceInMinute < 0) {
      differenceInMinute += 60;
      differenceInHour--;
    } else if (differenceInMinute >= 60) {
      differenceInMinute -= 60;
      differenceInHour++;
    }

    if (!isNaN(differenceInHour) && !isNaN(differenceInMinute)) {
      if (differenceInHour < 10) {
        differenceInHour = `0${differenceInHour}`;
      }
      if (differenceInMinute < 10) {
        differenceInMinute = `0${differenceInMinute}`;
      }
      const durationString = `${differenceInHour}:${differenceInMinute}`;
      setFormData((prevState: IFormData) => ({
        ...prevState,
        ["departureInfo"]: {
          ...prevState["departureInfo"],
          ["duration"]: durationString,
        },
      }));
    }
  };
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="return-info-content"
        id="return-info-header"
      >
        <Typography variant="h6" color="#888">
          Return Flight Information
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
                getOptionLabel={(option) => `${option.city} (${option.code})`}
                onChange={handleSelectChange("departureCity")}
                value={options["departureCity" as any]}
                size="small"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Departure City"
                    variant="outlined"
                    fullWidth
                    required
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
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Autocomplete
                options={options}
                getOptionLabel={(option) =>
                  option?.city + " (" + option?.code + ")"
                }
                onChange={handleSelectChange("arrivalCity")}
                value={options["arrivalCity" as any]}
                size="small"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Arrival City"
                    variant="outlined"
                    fullWidth
                    required
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
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                label="Departure Time"
                type="time"
                value={formData?.returnInfo?.departureTime ?? ""}
                onChange={handleChange}
                name="departureTime"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                label="Arrival Time"
                type="time"
                value={formData?.returnInfo?.arrivalTime ?? ""}
                onChange={handleChange}
                name="arrivalTime"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                label="Duration (HH:MM)"
                value={formData?.returnInfo?.duration ?? ""}
                onChange={handleChange}
                name="duration"
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                label="Departure Terminal"
                value={formData?.returnInfo?.departureTerminal ?? ""}
                onChange={handleChange}
                name="departureTerminal"
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                label="Arrival Terminal"
                value={formData?.returnInfo?.arrivalTerminal ?? ""}
                onChange={handleChange}
                name="arrivalTerminal"
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData?.returnInfo?.nextDay ?? false}
                    onChange={handleChange}
                    name="nextDay"
                    size="small"
                    required
                  />
                }
                label="Next Day"
              />
            </Grid>
          </Grid>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ReturnInfo;
