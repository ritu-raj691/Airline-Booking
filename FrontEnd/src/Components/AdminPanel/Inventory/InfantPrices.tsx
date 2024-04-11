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

interface IInfantPricesProps {
  formData: IFormData;
  setFormData: any;
}

const InfantPrices = (props: IInfantPricesProps) => {
  const { formData, setFormData } = props;

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prevState: IFormData) => ({
      ...prevState,
      ["infantPrices"]: {
        ...prevState["infantPrices"],
        [name as string]: value,
      },
    }));
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="infant-price-info-content"
        id="infant-price-info-header"
      >
        <Typography variant="h6" color="#888">
          Infant Prices
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
                label="Infant Purchase Price"
                name="infantPurchasePrice"
                value={formData.infantPrices.infantPurchasePrice}
                onChange={handleChange}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                label="Infant Selling Price"
                name="infantSellingPrice"
                value={formData.infantPrices.infantSellingPrice}
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

export default InfantPrices;
