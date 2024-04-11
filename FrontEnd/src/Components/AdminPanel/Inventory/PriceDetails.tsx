import React, { useEffect, useState } from "react";
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
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { IFormData, IPurchaseSellingPrices } from "../../../Model/Inventory";
import { formatDayJsDate } from "../../../Utils/Constant";
import PriceDetailRow from "./PriceDetailRow";

interface IPriceDetailsProps {
  formData: IFormData;
  setFormData: any;
}

const PriceDetails = (props: IPriceDetailsProps) => {
  const { formData, setFormData } = props;
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dateDifferenceRange, setDateDifferenceRange] = useState<Date[]>();
  let datesInRange: any = [];

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prevState: IFormData) => ({
      ...prevState,
      ["purchaseSellingPrices"]: {
        ...prevState["purchaseSellingPrices"],
        [name as string]: value,
      },
    }));
  };

  const onDateChange = (
    date: Dayjs | null,
    field: keyof IPurchaseSellingPrices
  ) => {
    setFormData((prevNestedObject: IFormData) => ({
      ...prevNestedObject,
      ["purchaseSellingPrices"]: {
        ...prevNestedObject["purchaseSellingPrices"],
        [field]: date,
      },
    }));
  };

  useEffect(() => {
    const startDate = formatDayJsDate(formData.generalInfo.startDate);
    const endDate = formatDayJsDate(formData.generalInfo.endDate);
    console.log("startDatae", startDate);
    console.log("endDate", endDate);
    datesInRange = [];
    for (
      let date = startDate;
      date < endDate;
      date.setDate(date.getDate() + 1)
    ) {
      console.log("dateee", date);
      datesInRange.push(new Date(date));
    }
    console.log("datesInRange????", datesInRange);
    setDateDifferenceRange(datesInRange);
  }, [formData.generalInfo.startDate, formData.generalInfo.endDate]);

  console.log("dateDifferenceRange>>", dateDifferenceRange);

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="stoppage-info-content"
        id="stoppage-info-header"
      >
        <Typography variant="h6" color="#888">
          Purchase Selling Prices
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* <Box
          sx={{
            minWidth: "280px",
            background: "white",
            padding: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              lg={2}
              className="grid-date-picker"
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={formData.purchaseSellingPrices.purchaseDate}
                  onChange={(newValue) =>
                    onDateChange(newValue, "purchaseDate")
                  }
                  format="DD/MM/YYYY"
                  views={["day", "month", "year"]}
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <TextField
                fullWidth
                label="Base Price"
                name="basePrice"
                value={formData.purchaseSellingPrices.basePrice}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <TextField
                fullWidth
                label="Fees & Taxes"
                name="feesAndTaxes"
                value={formData.purchaseSellingPrices.feesAndTaxes}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <TextField
                fullWidth
                label="PNR"
                name="pnr"
                value={formData.purchaseSellingPrices.pnr}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <TextField
                fullWidth
                label="Selling Price"
                name="sellingPrice"
                value={formData.purchaseSellingPrices.sellingPrice}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={1}>
              <TextField
                fullWidth
                label="Seat Quantity"
                name="seatQuantity"
                value={formData.purchaseSellingPrices.seatQuantity}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={1}>
              <TextField
                fullWidth
                label="Narration"
                name="narration"
                value={formData.purchaseSellingPrices.narration}
                onChange={handleChange}
                size="small"
              />
            </Grid>
          </Grid>
        </Box> */}
        {(dateDifferenceRange || []).map((date: any, index: number) => (
          <div
            key={`Selling_Price_Detail_Row_${index}`}
            style={
              index > 0
                ? { borderTop: "2px solid #888", padding: "8px" }
                : { padding: "8px" }
            }
          >
            <PriceDetailRow
              formData={formData}
              setFormData={setFormData}
              sellingDate={date}
            />
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default PriceDetails;
