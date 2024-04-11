import React from "react";
import { Box, Card, Typography } from "@mui/material";
import "./PriceSummary.css";

interface IPriceSummary {
  noOfAdults: number;
  noOfChildren: number;
  noOfInfants: number;
  adultBaseFare?: number;
  childrenBaseFare?: number;
  infantBaseFare?: number;
}

const PriceSummary = (props: IPriceSummary) => {
  const {
    noOfAdults,
    noOfChildren,
    noOfInfants,
    adultBaseFare = 0,
    childrenBaseFare = 0,
    infantBaseFare = 0,
  } = props;

  const calculateTotalAmount = () => {
    return (
      adultBaseFare * noOfAdults +
      childrenBaseFare * noOfChildren +
      infantBaseFare * noOfInfants
    );
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" className="price-summary-card">
        <Typography variant="h6" className="price-summary-label">
          Price Summary
        </Typography>
        <div className="flex-space-between">
          <Typography variant="body2" className="total-price-label">
            Total Price (including all taxes)
          </Typography>
          <Typography variant="h6" className="total-price">
            ₹ {calculateTotalAmount()}
          </Typography>
        </div>
      </Card>
    </Box>
  );
};

export default PriceSummary;
