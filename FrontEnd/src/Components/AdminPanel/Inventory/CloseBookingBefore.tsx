import React from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IFormData } from "../../../Model/Inventory";

interface ICabinBaggageProps {
  formData: IFormData;
  setFormData: any;
}

const CloseBookingBefore = (props: ICabinBaggageProps) => {
  const { formData, setFormData } = props;

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prevState: IFormData) => ({
      ...prevState,
      ["closeBookingBefore"]: {
        ...prevState["closeBookingBefore"],
        [name as string]: value,
      },
    }));
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="close-booking-info-content"
        id="close-booking-info-header"
      >
        <Typography variant="h6" color="#888">
          Close Booking Before
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
              <TextField
                fullWidth
                label="Days"
                name="days"
                value={formData.closeBookingBefore.days}
                onChange={handleChange}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                label="Time"
                type="time"
                value={formData.closeBookingBefore.closingTime}
                onChange={handleChange}
                name="closingTime"
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
          </Grid>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default CloseBookingBefore;
