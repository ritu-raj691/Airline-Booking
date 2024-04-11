import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IFormData } from "../../../Model/Inventory";

interface IStoppageProps {
  formData: IFormData;
  setFormData: any;
  isReturnInfoDetail?: boolean;
}

const Stoppage = (props: IStoppageProps) => {
  const { formData, setFormData, isReturnInfoDetail } = props;

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prevState: IFormData) => ({
      ...prevState,
      ["stoppageInfo"]: {
        ...prevState["stoppageInfo"],
        [name as string]: value,
      },
    }));
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="stoppage-info-content"
        id="stoppage-info-header"
      >
        <Typography variant="h6" color="#888">
          Stoppage Information
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
              <FormControl fullWidth required>
                <InputLabel>No. of departure stops</InputLabel>
                <Select
                  label="No. of departure stops"
                  value={formData.stoppageInfo.noOfDepartureStop}
                  onChange={handleChange}
                  name="noOfDepartureStop"
                  size="small"
                >
                  <MenuItem value="Non Stop">Non Stop</MenuItem>
                  <MenuItem value="1 Stop">1 Stop</MenuItem>
                  <MenuItem value="2 Stop">2 Stop</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {isReturnInfoDetail && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <FormControl fullWidth required>
                  <InputLabel>No. of return stops</InputLabel>
                  <Select
                    label="No. of departure stops"
                    value={formData.stoppageInfo.noOfReturnStop}
                    onChange={handleChange}
                    name="noOfReturnStop"
                    size="small"
                    required
                  >
                    <MenuItem value="Non Stop">Non Stop</MenuItem>
                    <MenuItem value="1 Stop">1 Stop</MenuItem>
                    <MenuItem value="2 Stop">2 Stop</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Stoppage;
