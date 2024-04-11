import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { termsAndCondition } from "../../../Constant/Constant";
import "./TermsAndCondition.css";

const TermsAndCondition = () => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" className="terms-and-condition-card">
        <Typography variant="subtitle1" className="terms-and-condition-label">
          Terms and Conditions
        </Typography>
        <ul>
          {termsAndCondition.map((item: string, index: number) => {
            return (
              <li
                key={`item${index + 1}`}
                style={{
                  margin: "0 32px",
                }}
              >
                <Typography
                  sx={{ mt: 2 }}
                  style={{
                    fontSize: "13px",
                    color: "rgb(64 63 63)",
                    marginTop: 8,
                  }}
                >
                  {item}
                </Typography>
              </li>
            );
          })}
        </ul>
      </Card>
    </Box>
  );
};

export default TermsAndCondition;
