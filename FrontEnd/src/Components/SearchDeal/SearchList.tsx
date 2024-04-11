import React, { lazy, Suspense } from "react";
import { Typography } from "@mui/material";

import { ITravelers } from "../../Model/Filters";
const FlightDetailCard = lazy(() => import("../SearchDeal/FlightDetailCard"));

interface ISearchList {
  allTravelers: ITravelers;
  selectedDate: Date | string;
}

const SearchList = (props: ISearchList) => {
  const { allTravelers, selectedDate } = props;

  return (
    <>
      <div className="selected-date-section">
        <Typography variant="subtitle2" className="selected-date">
          {selectedDate as any}
        </Typography>
      </div>
      <Suspense fallback={<></>}>
        <FlightDetailCard allTravelers={allTravelers as ITravelers} />
      </Suspense>
    </>
  );
};

export default SearchList;
