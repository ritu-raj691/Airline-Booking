import React, { Suspense, lazy, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Grid } from "@mui/material";
import { ITravelers } from "../../Model/Filters";
const ContactDetail = lazy(() => import("./ContactDetails/ContactDetailCard"));
const TermsAndCondition = lazy(
  () => import("./TermsAndCondition/TermsAndCondition")
);
const TravelersList = lazy(() => import("./TravelersList/TravelersList"));
const PriceSummary = lazy(() => import("./PriceSummary/PriceSummary"));
const FlightPriceBreakup = lazy(
  () => import("./FlightPriceBreakup/FlightPriceBreakup")
);

const adultBaseFare = 41500;
const childrenBaseFare = 41500;
const infantBaseFare = 3250;

const TravelerDetail = () => {
  const location = useLocation();
  const travelers: ITravelers = location.state?.allTravelers || {};
  const [noOfAdultsCards, setNoOfAdultsCards] = useState<number>(1);
  const [noOfChildrenCards, setNoOfChildrenCards] = useState<number>(0);
  const [noOfInfantsCards, setNoOfInfantsCards] = useState<number>(0);

  useEffect(() => {
    setNoOfAdultsCards(travelers.adults);
    setNoOfChildrenCards(travelers.children);
    setNoOfInfantsCards(travelers.infants);
  }, [travelers.adults, travelers.children, travelers.infants]);

  return (
    <>
      <Typography
        variant="h6"
        style={{ marginBottom: "20px", fontWeight: "bold" }}
      >
        Travelers Detail
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Suspense fallback={<></>}>
            <TravelersList
              noOfAdultsCards={noOfAdultsCards}
              noOfChildrenCards={noOfChildrenCards}
              noOfInfantsCards={noOfInfantsCards}
            />
            <div style={{ marginBottom: "20px" }}></div>
            <ContactDetail />
            <div style={{ marginBottom: "20px" }}></div>
            <TermsAndCondition />
          </Suspense>
          <Suspense fallback={<></>}></Suspense>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={4}>
          <Suspense fallback={<></>}>
            <PriceSummary
              adultBaseFare={adultBaseFare}
              childrenBaseFare={childrenBaseFare}
              infantBaseFare={infantBaseFare}
              noOfAdults={noOfAdultsCards}
              noOfChildren={noOfChildrenCards}
              noOfInfants={noOfInfantsCards}
            />
            <div style={{ marginBottom: "20px" }}></div>
            <FlightPriceBreakup
              adultBaseFare={adultBaseFare}
              childrenBaseFare={childrenBaseFare}
              infantBaseFare={infantBaseFare}
              noOfAdults={noOfAdultsCards}
              noOfChildren={noOfChildrenCards}
              noOfInfants={noOfInfantsCards}
            />
          </Suspense>
        </Grid>
      </Grid>
    </>
  );
};

export default TravelerDetail;
