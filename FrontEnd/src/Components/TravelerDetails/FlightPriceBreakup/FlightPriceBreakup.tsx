import React from "react";
import { Box, Card, Typography, Icon } from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ContactsIcon from "@mui/icons-material/Contacts";
import "./FlightPriceBreakup.css";

interface IFlightPriceBreakup {
  noOfAdults: number;
  noOfChildren: number;
  noOfInfants: number;
  adultBaseFare?: number;
  childrenBaseFare?: number;
  infantBaseFare?: number;
}

interface IFlightDetailRow {
  flightName: string;
  depCity: string;
  arrCity: string;
  imgUrl: string;
  depPlace?: string;
  depDate?: string;
  depTime?: string;
  travelTime?: string;
  arrPlace?: string;
  arrDate?: string;
  arrTime?: string;
  isNonRefundableBadge?: boolean;
}

const FlightPriceBreakup = (props: IFlightPriceBreakup) => {
  const {
    noOfAdults,
    noOfChildren,
    noOfInfants,
    adultBaseFare = 0,
    childrenBaseFare = 0,
    infantBaseFare = 0,
  } = props;

  const FlightDetailRow = (props: IFlightDetailRow) => {
    const {
      flightName = "",
      depCity = "",
      arrCity = "",
      imgUrl = "",
      depPlace = "",
      depDate = "",
      depTime = "",
      travelTime = "",
      arrPlace = "",
      arrDate = "",
      arrTime = "",
      isNonRefundableBadge = false,
    } = props;
    return (
      <>
        <div className="fltLgSct">
          {flightName} from {depCity} to {arrCity}
        </div>
        <div className="fltLgDtl">
          <div className="arI">
            <img src={imgUrl} style={{ display: "inline", width: "34px" }} />
          </div>
          <div className="dep">
            <div className="depA">{depPlace}</div>
            <div className="depD">
              {depDate}
              <br />
              {depTime}
            </div>
          </div>
          <div className="dur">
            <div className="durIc">
              <i className="icon-iconP-clk"></i>
            </div>
            <div className="durD">{travelTime}</div>
          </div>
          <div className="arr">
            <div className="arrA">{arrPlace}</div>
            <div className="arrD">
              {arrDate}
              <br />
              {arrTime}
            </div>
          </div>
        </div>
        {isNonRefundableBadge && (
          <div className="non-refundable-badge">
            <span className="non-refunable-label">Non-Refundable</span>
          </div>
        )}
      </>
    );
  };

  const calculateTotalAmount = () => {
    return (
      adultBaseFare * noOfAdults +
      childrenBaseFare * noOfChildren +
      infantBaseFare * noOfInfants
    );
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" className="flight-price-card">
        <div className="flex-end">
          <Icon component={DateRangeIcon} />
          <Typography variant="body2" className="travel-date label">
            Travel Date: <span>13 Jun 2024</span>
          </Typography>
        </div>
        <div className="flex-end padding-bottom-24">
          <Icon component={ContactsIcon} />
          <Typography variant="body2" className="no-of-travellers label">
            {noOfAdults} adult(s) and {noOfChildren} children and {noOfInfants}{" "}
            infant(s)
          </Typography>
        </div>
        <section className="flights">
          <Typography variant="body2" className="flight-label">
            FLIGHTS
          </Typography>
          <div className="flight-detail">
            <FlightDetailRow
              flightName="VJ - 896"
              depCity="Delhi"
              arrCity="Ho Chi Minh City"
              imgUrl="//cdn.yourholiday.me/static/img/poccom/airlines/icons/VJ.gif"
              depPlace="DEL"
              depDate="27 Apr 24"
              depTime="12:05 AM"
              travelTime="4h 45m"
              arrPlace="SGN"
              arrDate="27 Apr 24"
              arrTime="06:20 AM"
            />
            <div className="fltLyvr">1h 40m layover </div>
            <FlightDetailRow
              flightName="VJ - 896"
              depCity="Delhi"
              arrCity="Ho Chi Minh City"
              imgUrl="//cdn.yourholiday.me/static/img/poccom/airlines/icons/VJ.gif"
              depPlace="DEL"
              depDate="27 Apr 24"
              depTime="12:05 AM"
              travelTime="4h 45m"
              arrPlace="SGN"
              arrDate="27 Apr 24"
              arrTime="06:20 AM"
              isNonRefundableBadge
            />

            <div className="divider"></div>

            <FlightDetailRow
              flightName="VJ - 896"
              depCity="Delhi"
              arrCity="Ho Chi Minh City"
              imgUrl="//cdn.yourholiday.me/static/img/poccom/airlines/icons/VJ.gif"
              depPlace="DEL"
              depDate="27 Apr 24"
              depTime="12:05 AM"
              travelTime="4h 45m"
              arrPlace="SGN"
              arrDate="27 Apr 24"
              arrTime="06:20 AM"
            />
            <div className="fltLyvr">1h 40m layover </div>
            <FlightDetailRow
              flightName="VJ - 896"
              depCity="Delhi"
              arrCity="Ho Chi Minh City"
              imgUrl="//cdn.yourholiday.me/static/img/poccom/airlines/icons/VJ.gif"
              depPlace="DEL"
              depDate="27 Apr 24"
              depTime="12:05 AM"
              travelTime="4h 45m"
              arrPlace="SGN"
              arrDate="27 Apr 24"
              arrTime="06:20 AM"
              isNonRefundableBadge
            />
          </div>
        </section>
        <div className="solid-divider"></div>
        <section className="fare-breakup-section">
          <Typography className="h6">
            Fare Breakup for DEL-SGN,SGN-DPS
          </Typography>
          <div className="fare-breakup-row">
            <Typography variant="caption">Base Fare Adult</Typography>
            <Typography variant="caption" className="bold">
              ₹ {adultBaseFare} * {noOfAdults}
            </Typography>
          </div>
          <div className="fare-breakup-row">
            <Typography variant="caption">Base Fare Children</Typography>
            <Typography variant="caption" className="bold">
              ₹ {childrenBaseFare} * {noOfChildren}
            </Typography>
          </div>
          <div className="fare-breakup-row">
            <Typography variant="caption">Base Fare Infant</Typography>
            <Typography variant="caption" className="bold">
              ₹ {infantBaseFare} * {noOfInfants}
            </Typography>
          </div>
          <div className="fare-breakup-row">
            <Typography variant="caption">Total Amount</Typography>
            <Typography variant="caption" className="bold">
              ₹ {calculateTotalAmount()}
            </Typography>
          </div>
          <div className="fare-breakup-row">
            <Typography variant="caption">Net Payable</Typography>
            <Typography variant="caption" className="bold">
              ₹ {calculateTotalAmount()}
            </Typography>
          </div>
        </section>
      </Card>
    </Box>
  );
};

export default FlightPriceBreakup;
