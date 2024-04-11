import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import "./Footer.css"; // Import the CSS file

const Footer: React.FC = () => {
  return (
    <AppBar position="fixed" color="primary" className="footer">
      {" "}
      {/* Apply the footer class */}
      <Toolbar className="toolbar">
        {" "}
        {/* Apply the toolbar class */}
        <Typography variant="body1" color="inherit" className="footer-middle-label">
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
