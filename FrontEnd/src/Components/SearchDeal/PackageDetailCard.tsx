import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography } from "@mui/material";
import "./PackageDetailCard.css";

interface IPackageDetailCard {}

const PackageDetailCard = (props: IPackageDetailCard) => {
  const navigate = useNavigate();

  const onCardClick = () => {
    navigate("/package/glimpses-of-bali");
  };

  return (
    <Card
      variant="outlined"
      className="package-detail-card"
      onClick={onCardClick}
    >
      <section className="package-detail">
        <div className="package-img">
          <img
            src="//cdn.yourholiday.me/static/dynimg/itinerary/90/600x300/2960135-2960134_baliwatersports.jpg"
            alt="Bali image"
          />
        </div>
        <div className="package-info">
          <Typography variant="subtitle2" className="title">
            Glimpses of Bali
          </Typography>
          <Typography variant="caption">Bali</Typography>
          <div className="flex-row-center">
            <Typography variant="subtitle2" className="title-sub-info">
              ₹ 62,187
            </Typography>
            <Typography variant="caption">per person</Typography>
            <Typography variant="caption" className="view-details">
              View Details
            </Typography>
          </div>
        </div>
      </section>
    </Card>
  );
};

export default PackageDetailCard;
