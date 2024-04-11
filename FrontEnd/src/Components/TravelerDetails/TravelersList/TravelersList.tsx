import React, { lazy, Suspense } from "react";
import { Box, Card, Typography } from "@mui/material";
import "./TravelersList.css";
const AdultCard = lazy(() => import("../TravelerCard/AdultCard"));
const ChildrenCard = lazy(() => import("../TravelerCard/ChildrenCard"));
const InfantCard = lazy(() => import("../TravelerCard/InfantCard"));
interface ITravelersList {
  noOfAdultsCards: number;
  noOfChildrenCards: number;
  noOfInfantsCards: number;
}

const TravelersList = (props: ITravelersList) => {
  const { noOfAdultsCards, noOfChildrenCards, noOfInfantsCards } = props;
  let counter = 0;

  const adultIndices = Array.from(
    { length: noOfAdultsCards },
    (_, index) => index
  );

  const childrenIndices = Array.from(
    { length: noOfChildrenCards },
    (_, index) => index
  );

  const infantIndices = Array.from(
    { length: noOfInfantsCards },
    (_, index) => index
  );

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" className="travelers-list-card">
        <Typography variant="body2" className="description-label">
          Please enter names as per valid id proof and contact information for
          guests traveling on this trip:
        </Typography>
        <Suspense fallback={<></>}>
          {adultIndices.map((item, index) => {
            ++counter;
            return (
              <React.Fragment key={`Adult${counter}`}>
                <AdultCard cardLabel="Adult" cardNumber={counter} />
              </React.Fragment>
            );
          })}
          {childrenIndices.map((item, index) => {
            ++counter;
            return (
              <React.Fragment key={`Children${counter}`}>
                <ChildrenCard cardLabel="Children" cardNumber={counter} />
              </React.Fragment>
            );
          })}
          {infantIndices.map((item, index) => {
            ++counter;
            return (
              <React.Fragment key={`Infant${counter}`}>
                <InfantCard cardLabel="Infant" cardNumber={counter} />
              </React.Fragment>
            );
          })}
        </Suspense>
      </Card>
    </Box>
  );
};

export default TravelersList;
