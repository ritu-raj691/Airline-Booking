import React, { lazy, Suspense, useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField, Button, Grid, Link, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { IFormData } from "../../../Model/Inventory";
import { pageTitles } from "../../../Constant/Constant";
const GeneralInfo = lazy(() => import("./GeneralInfo"));
const DepartureInfo = lazy(() => import("./DepartureInfo"));
const ReturnInfo = lazy(() => import("./ReturnInfo"));
const StoppageInfo = lazy(() => import("./StoppageInfo"));
const CheckInBaggage = lazy(() => import("./CheckInBaggage"));
const CabinBaggage = lazy(() => import("./CabinBaggage"));
const InfantPrices = lazy(() => import("./InfantPrices"));
const PriceDetails = lazy(() => import("./PriceDetails"));
const CloseBookingBefore = lazy(() => import("./CloseBookingBefore"));

const DeptArrivalInfo = () => {
  const [formData, setFormData] = useState<IFormData>({
    generalInfo: {
      airline: "",
      airlineNumber: "",
      returnAirlineNumber: "",
      startDate: dayjs(new Date()),
      endDate: null,
      tripDuration: "",
    },
    departureInfo: {
      departureCity: { city: "", code: "", airport: "" },
      arrivalCity: { city: "", code: "", airport: "" },
      departureTime: "",
      arrivalTime: "",
      duration: "",
      departureTerminal: "",
      arrivalTerminal: "",
      nextDay: false,
    },
    returnInfo: {
      departureCity: { city: "", code: "" },
      arrivalCity: { city: "", code: "" },
      departureTime: "",
      arrivalTime: "",
      duration: "",
      departureTerminal: "",
      arrivalTerminal: "",
      nextDay: false,
    },
    stoppageInfo: {
      noOfDepartureStop: "Non Stop",
      noOfReturnStop: "Non Stop",
    },
    checkInBaggage: {
      adult: "15",
      children: "15",
      infant: "0",
    },
    cabinBaggage: {
      adult: "7",
      children: "7",
      infant: "7",
    },
    closeBookingBefore: {
      days: 0,
      closingTime: "",
    },
    infantPrices: {
      infantPurchasePrice: "",
      infantSellingPrice: "",
    },
    purchaseSellingPrices: {
      purchaseDate: null,
      basePrice: "",
      feesAndTaxes: "",
      pnr: "",
      sellingPrice: "",
      seatQuantity: "",
      narration: "",
    },
  });
  console.log("DeptArrivalInfo", formData);
  useEffect(() => {
    document.title = pageTitles.adminDepartureReturn;
  }, []);

  const onSaveClick = async () => {
    try {
      const flightData = formData.departureInfo;
      const response = await axios.post(
        "http://localhost:8080/admin/generalinfo",
        flightData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("responseeee", response);
      return response.data;
    } catch (error) {
      console.error("Error inserting flight data:", error);
      throw new Error("Failed to insert flight data");
    }
  };

  return (
    <div>
      <Suspense fallback={<></>}>
        <GeneralInfo
          formData={formData}
          setFormData={setFormData}
          isReturnInfoDetail={true}
        />
      </Suspense>
      <Suspense fallback={<></>}>
        <DepartureInfo
          formData={formData}
          setFormData={setFormData}
          isReturnInfoDetail={true}
        />
      </Suspense>
      <Suspense fallback={<></>}>
        <ReturnInfo formData={formData} setFormData={setFormData} />
      </Suspense>
      <Suspense fallback={<></>}>
        <StoppageInfo
          formData={formData}
          setFormData={setFormData}
          isReturnInfoDetail={true}
        />
      </Suspense>
      <Suspense fallback={<></>}>
        <CheckInBaggage formData={formData} setFormData={setFormData} />
      </Suspense>
      <Suspense fallback={<></>}>
        <CabinBaggage formData={formData} setFormData={setFormData} />
      </Suspense>
      <Suspense fallback={<></>}>
        <InfantPrices formData={formData} setFormData={setFormData} />
      </Suspense>
      <Suspense fallback={<></>}>
        <PriceDetails formData={formData} setFormData={setFormData} />
      </Suspense>
      <Suspense fallback={<></>}>
        <CloseBookingBefore formData={formData} setFormData={setFormData} />
      </Suspense>
      <Box
        sx={{
          minWidth: "280px",
          background: "white",
          padding: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} md={2} lg={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={onSaveClick}
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={12} sm={3} md={2} lg={2}>
            <Button
              variant="contained"
              style={{ background: "#fff", color: "#333" }}
              fullWidth
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default DeptArrivalInfo;
