import React from "react";
import { Box, Card, Typography } from "@mui/material";
import "./DepartureDetail.css";

const DepartureDetail = () => {
  return (
    <div className="box-detail">
      <Typography variant="body2" className="date">
        28 Mar
      </Typography>
      <Typography variant="caption" className="seat">
        1 seat left
      </Typography>
    </div>
  );
};

export default DepartureDetail;
