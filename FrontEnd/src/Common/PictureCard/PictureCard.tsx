import React, { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, Typography, Button, Rating } from "@mui/material";
import "./PictureCard.css";
const UpcomingDepartures = lazy(
  () => import("../DepartureDetails/DepartureDetail")
);

interface IPictureCard {
  imgName: string;
  textOnImage?: string;
}

const PictureCard = (props: any) => {
  const navigate = useNavigate();

  const onViewDetailsClick = () => {
    navigate("/package/glimpses-of-bali");
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" className="pic-card">
        <figure className="main-img">
          <a href="/package/glimpses-of-bali-2731647" target="_blank">
            <img
              src="//cdn.yourholiday.me/static/dynimg/itinerary/90/600x300/2960135-2960134_baliwatersports.jpg"
              alt="image.jpg"
            />
          </a>
          <Typography variant="subtitle2" className="highlight">
            Guaranteed Departure
          </Typography>
        </figure>

        <div className="card-detail">
          <Typography variant="h6" className="header">
            Glimpses of Bali
          </Typography>
          <Typography variant="caption" className="itenary">
            Bali 6N
          </Typography>
          <Rating
            name="decimal-rating"
            value={4}
            readOnly
            precision={0.5}
            className="ratings"
          />
          <Typography variant="subtitle2" className="upcoming-departures-label">
            Upcoming Departures:
          </Typography>
          <div className="upcoming-depart-details">
            <Suspense fallback={<></>}>
              <div className="padding-top-12">
                <UpcomingDepartures />
              </div>
              <div className="padding-top-12">
                <UpcomingDepartures />
              </div>
              <div className="padding-top-12">
                <UpcomingDepartures />
              </div>
              <div className="padding-top-12">
                <UpcomingDepartures />
              </div>
            </Suspense>
          </div>
        </div>
        <div className="card-price">
          <Typography variant="body2" className="color-666">
            Starting
          </Typography>
          <Typography variant="h6" className="package-fare margin-top-8">
            ₹ 62,187
          </Typography>
          <Typography variant="caption" className="color-666">
            per person
          </Typography>
          <Button
            variant="contained"
            className="view-details-btn margin-top-8"
            onClick={onViewDetailsClick}
          >
            View Details
          </Button>
          <Typography variant="caption" className="margin-top-8 color-666">
            including flights & all taxes
          </Typography>
        </div>
      </Card>
    </Box>
  );
};

export default PictureCard;
