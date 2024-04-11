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

const CabinBaggage = (props: ICabinBaggageProps) => {
  const { formData, setFormData } = props;

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prevState: IFormData) => ({
      ...prevState,
      ["cabinBaggage"]: {
        ...prevState["cabinBaggage"],
        [name as string]: value,
      },
    }));
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="cabin-baggage-info-content"
        id="cabin-baggage-info-header"
      >
        <Typography variant="h6" color="#888">
          Cabin Baggage
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
                label="Adult"
                name="adult"
                value={formData.cabinBaggage.adult}
                onChange={handleChange}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                label="Children"
                name="children"
                value={formData.cabinBaggage.children}
                onChange={handleChange}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                label="Infant"
                name="infant"
                value={formData.cabinBaggage.infant}
                onChange={handleChange}
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

export default CabinBaggage;
