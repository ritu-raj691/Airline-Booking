import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { IFormData, IPurchaseSellingPrices } from "../../../Model/Inventory";

interface IPriceDetailsProps {
  formData: IFormData;
  setFormData: any;
  sellingDate: Date | null;
}

const PriceDetailRow = (props: IPriceDetailsProps) => {
  const { formData, setFormData, sellingDate } = props;
  const [purchaseDetails, setPurchaseDetails] =
    useState<IPurchaseSellingPrices>({
      purchaseDate: dayjs(sellingDate) || null,
      basePrice: "",
      feesAndTaxes: "",
      pnr: "",
      sellingPrice: "",
      seatQuantity: "",
      narration: "",
    });

  useEffect(() => {
    setPurchaseDetails((prevState: IPurchaseSellingPrices) => ({
      ...prevState,
      ["purchaseDate"]: dayjs(sellingDate),
    }));
  }, [sellingDate]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // setFormData((prevState: IFormData) => ({
    //   ...prevState,
    //   ["purchaseSellingPrices"]: {
    //     ...prevState["purchaseSellingPrices"],
    //     [name as string]: value,
    //   },
    // }));

    setPurchaseDetails((prevState: IPurchaseSellingPrices) => ({
      ...prevState,
      [name as string]: value,
    }));
  };

  const onDateChange = (
    date: Dayjs | null,
    field: keyof IPurchaseSellingPrices
  ) => {
    // setFormData((prevNestedObject: IFormData) => ({
    //   ...prevNestedObject,
    //   ["purchaseSellingPrices"]: {
    //     ...prevNestedObject["purchaseSellingPrices"],
    //     [field]: date,
    //   },
    // }));

    setPurchaseDetails((prevState: IPurchaseSellingPrices) => ({
      ...prevState,
      [field]: date,
    }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3} lg={2} className="grid-date-picker">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date *"
            value={purchaseDetails.purchaseDate ?? dayjs(new Date())}
            onChange={(newValue) => onDateChange(newValue, "purchaseDate")}
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
          value={purchaseDetails.basePrice}
          onChange={handleChange}
          size="small"
          required
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <TextField
          fullWidth
          label="Fees & Taxes"
          name="feesAndTaxes"
          value={purchaseDetails.feesAndTaxes}
          onChange={handleChange}
          size="small"
          required
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <TextField
          fullWidth
          label="PNR"
          name="pnr"
          value={purchaseDetails.pnr}
          onChange={handleChange}
          size="small"
          required
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <TextField
          fullWidth
          label="Selling Price"
          name="sellingPrice"
          value={purchaseDetails.sellingPrice}
          onChange={handleChange}
          size="small"
          required
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={2}>
        <TextField
          fullWidth
          label="Seat Quantity"
          name="seatQuantity"
          value={purchaseDetails.seatQuantity}
          onChange={handleChange}
          size="small"
          required
        />
      </Grid>
      {/* <Grid item xs={12} sm={6} md={3} lg={1}>
        <TextField
          fullWidth
          label="Narration"
          name="narration"
          value={purchaseDetails.narration}
          onChange={handleChange}
          size="small"
        />
      </Grid> */}
    </Grid>
  );
};

export default PriceDetailRow;
