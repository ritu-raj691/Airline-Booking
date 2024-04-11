import React, { useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { title, options, meals } from "../../../Constant/Constant";
import "./TravelerCard.css";

interface IInfantCard {
  cardLabel: string;
  cardNumber: number;
}

interface FormData {
  title: string;
  fname: string;
  lname: string;
  dob: any;
  meal: string;
}

const InfantCard = (props: IInfantCard) => {
  const { cardLabel, cardNumber } = props;
  const [formData, setFormData] = useState<FormData>({
    title: "Mr",
    fname: "",
    lname: "",
    dob: null,
    meal: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // validateField(name, value);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onDateChange = (newValue: Dayjs | null) => {
    const formattedDob = new Date(
      newValue?.toString() ?? ""
    )?.toLocaleDateString("en-US", options as any);
    setFormData({ ...formData, ["dob"]: formattedDob });
  };

  return (
    <div className="traveler-box">
      <Typography variant="body2" className="traveler-serial-number">
        Traveler {cardNumber}: {cardLabel}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl required size="small" style={{ width: "100%" }}>
            <InputLabel id="select-small-title">Title</InputLabel>
            <Select
              fullWidth
              labelId="select-small-title"
              id="demo-select-small"
              value={formData.title}
              label="Title"
              name="title"
              onChange={handleSelectChange}
              error={!!errors.title}
            >
              {title.map((item: any, index: number) => (
                <MenuItem value={item?.value} key={`MenuItem_${index + 1}`}>
                  {item?.label ?? ""}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            error={!!errors.fname}
            helperText={errors.fname}
            label="First Name"
            name="fname"
            type="text"
            value={formData.fname}
            onChange={handleChange}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            error={!!errors.lname}
            helperText={errors.lname}
            label="Last Name"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} className="dob-date-grid">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Date of Birth *"
                className="dob-date-picker"
                name="dob"
                value={formData.dob}
                onChange={(newValue) => onDateChange(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl size="small" style={{ width: "100%" }}>
            <InputLabel id="select-small-meal">
              Meal Preference (Optional)
            </InputLabel>
            <Select
              fullWidth
              labelId="select-small-meal"
              id="small-meal-select"
              value={formData.meal}
              label="Meal Preference (Optional)"
              name="meal"
              onChange={handleSelectChange}
              error={!!errors.meal}
            >
              {meals.map((item: any, index: number) => (
                <MenuItem value={item?.value} key={`meal_${index + 1}`}>
                  {item?.label ?? ""}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default InfantCard;
