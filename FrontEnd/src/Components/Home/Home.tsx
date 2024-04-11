import React, { lazy, Suspense } from "react";
import { Typography } from "@mui/material";
import "./Home.css";
const FlightList = lazy(() => import("../FlightList/FlightList"));

const Home = () => {
  return (
    <>
      <Typography variant="h5" className="package-label">
        Book Fixed Departure Packages at Best Prices
      </Typography>
      <Suspense fallback={<></>}>
        <FlightList />
      </Suspense>
      <Suspense fallback={<></>}>
        <FlightList />
      </Suspense>
      <Suspense fallback={<></>}>
        <FlightList />
      </Suspense>
      <Suspense fallback={<></>}>
        <FlightList />
      </Suspense>
      <Suspense fallback={<></>}>
        <FlightList />
      </Suspense>
    </>
  );
};

export default Home;
