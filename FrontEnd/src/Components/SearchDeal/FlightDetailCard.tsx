import React, { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import "./FlightDetailCard.css";
import { Box, Card, Typography, Button } from "@mui/material";
import { ITravelers } from "../../Model/Filters";
const PackageDetailCard = lazy(() => import("./PackageDetailCard"));

interface IFlightDetailCard {
  allTravelers: ITravelers;
}

const FlightDetailCard = (props: IFlightDetailCard) => {
  const { allTravelers } = props;
  const navigate = useNavigate();

  const onBookNowClick = () => {
    navigate("/traveler-detail", { state: { allTravelers } });
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" className="card">
        <section className="parent-section">
          <div className="flight-info">
            <div className="flight-info-row">
              <div className="flight-detail">
                <div className="flight-logo"></div>
                <div className="flight-name">Vietjet Air</div>
                <div className="flight-number margin-top-8">896/893</div>
              </div>
              <div className="flight-full-detail">
                <div className="time-place-info">
                  <Typography variant="h6" className="time">
                    11:21
                  </Typography>
                  <div className="departure-place">
                    <Typography
                      variant="caption"
                      className="departure-place-name"
                    >
                      Delhi
                    </Typography>
                    <span>
                      <Typography
                        variant="caption"
                        className="departure-place-code"
                      >
                        DEL
                      </Typography>
                    </span>
                  </div>
                  <Typography variant="body2">30-May-2024</Typography>
                </div>
                <div className="duration-info">
                  <div className="duration">10h 30m</div>
                  <div className="arrow">
                    <div className="arrow-box"></div>
                  </div>
                  <div className="stoppage">1 stop</div>
                </div>
                <div className="arrival-info">
                  <Typography variant="h6" className="arrival-time">
                    13:06
                  </Typography>
                  <div className="arrival-place">
                    <Typography
                      variant="caption"
                      className="arrival-place-code"
                    >
                      DPS
                    </Typography>
                    Bali
                  </div>
                  <Typography variant="body2">30-May-2024</Typography>
                </div>
              </div>
            </div>
            <div className="flight-row-divider"></div>
            <div className="flight-info-row">
              <div className="flight-detail">
                <div className="flight-logo"></div>
                <div className="flight-name">Vietjet Air</div>
                <div className="flight-number margin-top-8">896/893</div>
              </div>
              <div className="flight-full-detail">
                <div className="time-place-info">
                  <Typography variant="h6" className="time">
                    11:21
                  </Typography>
                  <div className="departure-place">
                    <Typography
                      variant="caption"
                      className="departure-place-name"
                    >
                      Delhi
                    </Typography>
                    <span>
                      <Typography
                        variant="caption"
                        className="departure-place-code"
                      >
                        DEL
                      </Typography>
                    </span>
                  </div>
                  <Typography variant="body2">30-May-2024</Typography>
                </div>
                <div className="duration-info">
                  <div className="duration">10h 30m</div>
                  <div className="arrow">
                    <div className="arrow-box"></div>
                  </div>
                  <div className="stoppage">1 stop</div>
                </div>
                <div className="arrival-info">
                  <Typography variant="h6" className="arrival-time">
                    13:06
                  </Typography>
                  <div className="arrival-place">
                    <Typography
                      variant="caption"
                      className="arrival-place-code"
                    >
                      DPS
                    </Typography>
                    Bali
                  </div>
                  <Typography variant="body2">30-May-2024</Typography>
                </div>
              </div>
            </div>
          </div>
          <div className="price-info">
            <div className="fare-with-book-now">
              <Typography variant="h6" className="fare">
                ₹ 37,999
              </Typography>
              <Button
                variant="contained"
                className="book-now-btn"
                onClick={onBookNowClick}
              >
                Book Now
              </Button>
            </div>
          </div>
        </section>
        <section className="flight-booking-info">
          {/* <div className="flight-one-way-booking-info">
            <div className="airline-info">
              <span className="airline-name">Vietjet Air</span> |{" "}
              <span className="airline-number">896, 893</span>
              <span className="airline-departure-date">13 Apr</span>
            </div>
            <div className="layover-info">
              1h 40m layover in Ho Chi Minh City
            </div>
            <div className="flight-detail-block">
              <div className="departure-info">
                <Typography variant="caption" className="departure-time">
                  11:21
                </Typography>
                <div className="departure-place">
                  <Typography
                    variant="caption"
                    className="departure-place-name"
                  >
                    Delhi
                  </Typography>
                  <span>
                    <Typography
                      variant="caption"
                      className="departure-place-code"
                    >
                      DEL
                    </Typography>
                  </span>
                </div>
              </div>
              <div className="duration-info">
                <div className="duration">10h 30m</div>
                <div className="arrow">
                  <div className="arrow-box"></div>
                </div>
                <div className="stoppage">1 stop</div>
              </div>
              <div className="arrival-info">
                <Typography variant="caption" className="arrival-time">
                  13:06
                </Typography>
                <div className="arrival-place">
                  <Typography variant="caption" className="arrival-place-code">
                    DPS
                  </Typography>
                  Bali
                </div>
              </div>
            </div>
          </div>
          <div className="flight-return-booking-info">
            <div className="airline-info">
              <span className="airline-name">Vietjet Air</span> |{" "}
              <span className="airline-number">894, 895</span>
              <span className="airline-departure-date">19 Apr</span>
            </div>
            <div className="layover-info">
              1h 55m layover in Ho Chi Minh City
            </div>
            <div className="flight-detail-block">
              <div className="departure-info">
                <Typography variant="caption" className="departure-time">
                  11:21
                </Typography>
                <div className="departure-place">
                  <Typography
                    variant="caption"
                    className="departure-place-name"
                  >
                    Bali
                  </Typography>
                  <span>
                    <Typography
                      variant="caption"
                      className="departure-place-code"
                    >
                      DPS
                    </Typography>
                  </span>
                </div>
              </div>
              <div className="duration-info">
                <div className="duration">11h 15m</div>
                <div className="arrow">
                  <div className="arrow-box"></div>
                </div>
                <div className="stoppage">1 stop</div>
              </div>
              <div className="arrival-info">
                <Typography variant="caption" className="arrival-time">
                  13:06
                </Typography>
                <div className="arrival-place">
                  <Typography variant="caption" className="arrival-place-code">
                    DEL
                  </Typography>
                  Delhi
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="seat-booking-info">
            <div className="seat-info-with-buggage">
              <Typography variant="caption" className="seat-left">
                10 seats left
              </Typography>
              <Typography variant="overline">20 KG</Typography>
            </div>
            <div className="fare-with-book-now">
              <Typography variant="h6" className="fare">
                ₹ 37,999
              </Typography>
              <Button
                variant="contained"
                className="book-now-btn"
                onClick={onBookNowClick}
              >
                Book Now
              </Button>
            </div>
          </div> */}
        </section>
        {/* <div className="package-detail-info">
          <Suspense fallback={<></>}>
            <PackageDetailCard />
          </Suspense>
        </div> */}
      </Card>
    </Box>
  );
};

export default FlightDetailCard;
