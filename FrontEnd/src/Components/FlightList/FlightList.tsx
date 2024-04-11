import React, { lazy, Suspense } from "react";
import "./FlightList.css";
const PictureCard = lazy(() => import("../../Common/PictureCard/PictureCard"));

const FlightList = () => {
  return (
    <div>
      <Suspense fallback={<></>}>
        <PictureCard />
      </Suspense>
    </div>
  );
};

export default FlightList;
