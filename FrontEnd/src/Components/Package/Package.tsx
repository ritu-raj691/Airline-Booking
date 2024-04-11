import React, { useState } from "react";
import { Typography, Collapse } from "@mui/material";
import "./Package.css";

const Package = () => {
  const [expandedItenary, setExpandedItenary] = useState<boolean>(false);
  const [expandedTerms, setExpandedTerms] = useState<boolean>(false);

  const toggleExpandedItenary = () => {
    setExpandedItenary(!expandedItenary);
  };

  const toggleExpandedTerms = () => {
    setExpandedTerms(!expandedTerms);
  };

  return (
    <div className="package">
      <section className="hero">
        <div className="hero-overlay-layer">
          <div className="sub-container">
            <div className="flex-wrap-row">
              <div>
                <Typography variant="h4" className="bold-white-text">
                  Glimpses of Bali
                </Typography>
                <Typography
                  variant="body1"
                  className="sub-header-row2 bold-white-text"
                >
                  6N Bali
                </Typography>
                <Typography
                  variant="body2"
                  className="sub-header-row3 bold-white-text"
                >
                  7 days
                </Typography>
              </div>
              <div>
                <Typography
                  variant="body1"
                  className="sub-header-row2 bold-white-text"
                >
                  From
                </Typography>
                <Typography variant="h4" className="bold-white-text">
                  ₹ 68,499
                </Typography>
                <Typography variant="body2" className="bold-white-text">
                  per person
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bottom-container">
        <Typography variant="h5" className="font-bold">
          About the tour
        </Typography>
        <Typography variant="body2" className="padding-top-16">
          A bestseller trip for first timers to Bali. It covers the most
          important sights in Bali over a period of 6 days. The deal has special
          airfares bundled with hotels and land excursions to sell. There are 2
          days provided free where guests have time to indulge in activities on
          their own.
        </Typography>
        <div className="solid-divider margin-top-bottom-24"></div>
        <Typography variant="h5" className="font-bold">
          Highlights
        </Typography>
        <ul className="padding-top-16 margin-left-16">
          <li>
            <Typography variant="body2">
              To and Fro Flights in Economy Class/Typography
            </Typography>
          </li>
          <li>
            <Typography variant="body2" className="padding-top-16">
              Stay at 4 star Mercure Resort Bali Legian
            </Typography>
          </li>
          <li>
            <Typography variant="body2" className="padding-top-16">
              Sunset at Tanah Lot Temple
            </Typography>
          </li>
          <li>
            <Typography variant="body2" className="padding-top-16">
              Witness Cliffs of Uluwatu with Kecak Dance
            </Typography>
          </li>
          <li>
            <Typography variant="body2" className="padding-top-16">
              Explore Kintamani Region with visit to Tukad Cepung Waterfalls
            </Typography>
          </li>
          <li>
            <Typography variant="body2" className="padding-top-16">
              Explore Ubud with Rice Terraces
            </Typography>
          </li>
          <li>
            <Typography variant="body2" className="padding-top-16">
              See the picturesque Ulun Danu Temple at Lake Beratan
            </Typography>
          </li>
        </ul>
        <div className="solid-divider margin-top-bottom-24"></div>
        <Typography variant="h5" className="font-bold">
          Flights
        </Typography>
        <Typography variant="body2" className="padding-top-16">
          Vietjet Air flight from Delhi (DEL) to Ho Chi Minh City (SGN)
          departing at 00:05 arriving at 06:20
        </Typography>
        <Typography variant="body2">
          Vietjet Air flight from Ho Chi Minh City (SGN) to Bali (DPS) departing
          at 08:00 arriving at 13:05
        </Typography>
        <div className="solid-divider margin-top-bottom-24"></div>
        <Typography variant="h5" className="font-bold">
          Accommodation
        </Typography>
        <div className="card travel-card col-5 margin-top-16">
          <figure className="card-img">
            <img
              src="https://i.travelapi.com/lodging/10000000/9100000/9093700/9093688/17f4e08c_z.jpg"
              style={{ width: "100%" }}
            />
          </figure>
          <div className="travelcard-content">
            <Typography variant="body1" className="font-bold">
              Mercure Bali Legian - CHSE Certified or Similar
            </Typography>
            <Typography
              variant="body2"
              color="#888"
              style={{ marginTop: "4px" }}
            >
              6 night(s) in Bali
            </Typography>
            <Typography
              variant="body2"
              color="#888"
              style={{ marginTop: "8px" }}
            >
              Room Type: Superior Room
            </Typography>
            <Typography
              variant="body2"
              color="#888"
              style={{ marginTop: "4px" }}
            >
              Meals Included: Breakfast
            </Typography>
          </div>
        </div>
        <div className="solid-divider margin-top-bottom-24"></div>
        <Typography variant="h5" className="font-bold">
          Included in the price
        </Typography>
        <Typography variant="h6" className="padding-top-16">
          Bali
        </Typography>
        <ul className="padding-top-16 margin-left-16">
          <li>
            <Typography variant="body2">
              Half Day Tanah Lot Tour - Private
            </Typography>
          </li>
          <li>
            <Typography variant="body2" className="padding-top-16">
              Private Transfer from Hotel to Airport
            </Typography>
          </li>
          <li>
            <Typography variant="body2" className="padding-top-16">
              Uluwatu + Kecak Dance - Private Basis
            </Typography>
          </li>
          <li>
            <Typography variant="body2" className="padding-top-16">
              Ubud and Kintamani with Tukad Cepung Waterfall - Private
            </Typography>
          </li>
          <li>
            <Typography variant="body2" className="padding-top-16">
              Private Transfer from Airport to Hotel
            </Typography>
          </li>
          <li>
            <Typography variant="body2" className="padding-top-16">
              North Bali with Rice Terraces (Jatiluwih - Bedugul with Taman
              Ayun) - Private
            </Typography>
          </li>
        </ul>

        <div className="solid-divider margin-top-bottom-24"></div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h5" className="font-bold">
            Day-wise Itinerary
          </Typography>
          <Typography
            variant="body2"
            component="div"
            onClick={toggleExpandedItenary}
            style={{ cursor: "pointer" }}
          >
            {expandedItenary ? "Collapse" : "Expand"}
          </Typography>
        </div>

        <Collapse in={expandedItenary} timeout="auto" unmountOnExit>
          <Typography
            variant="body2"
            className="margin-top-16 margin-bottom-16"
          >
            Day 1: Arrival At Bali -
          </Typography>
          <Typography variant="caption">
            Arrival at Bali International Airport Ngurah Rai (DPS). Our
            representative will welcome you at the airport then transfer to your
            hotel. Rest of the evening is free for you at leisure.
          </Typography>

          <Typography
            variant="body2"
            className="margin-top-16 margin-bottom-16"
          >
            Day 2: Full Day Ubud Kintamani Tour With Tukad Cepung Waterfalls
          </Typography>
          <Typography variant="caption">
            After breakfast proceed for Kintamani tours which will guide you
            around some of the most desirable and beautiful areas located in the
            northeast of Bali including incredible views of the Mount Batur
            volcano and the lakes of the area. As with most tours the eight hour
            tour begins at 9am at your personal hotel where air conditioned
            transport to the first locations that are traditional markets where
            cheap and beautiful gold and sliver where can be purchased and
            examined as well as carving of grand size and smaller examples that
            may make practical gifts or souvenirs. The Tukad Cepung Waterfall is
            one of the best among Bali waterfalls. You will be captivated by the
            beauty of the waterfall. A beautiful sight that you will see when
            you visit the waterfall, is the sun rays reflecting in the
            glistening water projecting a rainbow, which seems absolutely
            ethereal. The waterfall is well hidden between rocks and once you
            visit the place, you will be filled with a sense of peace of
            tranquility in the cool atmosphere of the Tukad Cepung Waterfall.
            Overnight stay at hotel.
          </Typography>
        </Collapse>

        <div className="solid-divider margin-top-bottom-24"></div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h5" className="font-bold">
            Terms and Conditions
          </Typography>
          <Typography
            variant="body2"
            component="div"
            onClick={toggleExpandedTerms}
            style={{ cursor: "pointer" }}
          >
            {expandedTerms ? "Collapse" : "Expand"}
          </Typography>
        </div>

        <Collapse in={expandedTerms} timeout="auto" unmountOnExit>
          <ul className="padding-top-16 margin-left-16">
            <li>
              <Typography variant="body2" className="font-bold">
                CANCELLATIONS / REFUNDS
              </Typography>
            </li>
            <li>
              <Typography variant="body2" className="padding-top-16">
                A reservation should be considered cancelled only after
                receiving our confirmation of such cancellation. If a
                cancellation is received less than 60 days prior to the arrival
                of passenger, the cancellation expenses will be charged
                according to the following table:
              </Typography>
            </li>
            <li>
              <Typography variant="body2" className="padding-top-16">
                14 – 08 days before arrival: 50% of total price
              </Typography>
            </li>
            <li>
              <Typography variant="body2" className="padding-top-16">
                07 – 00 days or if have no show of passenger: 100% of total
                price.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" className="padding-top-16">
                There will be no refund for unused services or changes in
                itineraries made by passengers without permission.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" className="padding-top-16 font-bold">
                BAGGAGE
              </Typography>
            </li>
            <li>
              <Typography variant="body2" className="padding-top-16">
                It is allowed 02 suitcase normal sized per passenger in all
                transports. Passenger shall be fully responsible for their
                luggage and personal belongings during the course of the trip.
                Regarding to land transport, luggage and other personal
                belongings should be kept with you, whatever part of the vehicle
                that will be placed and will be transported at the risk of the
                user. We recommend users are present in all manipulations of
                loading and unloading of baggage. Baggage on air transport,
                rail, sea or driving, conditions of transport companies will
                apply, being the ticket passage, the document binds the
                mentioned companies to the passenger. If client suffer any
                baggage damage, loss or delay, the passenger must present a
                claim against the Transport Company. For transport of large
                volumes of luggage such as bicycles, surfboards, etc, a
                supplement will apply (please consult). The tour packages in
                economy class can have a piece of 15kg in air transport. The
                company may charge a supplement or can refuse baggage that
                exceed this weight or parts. Recommended not to store valuables,
                medication, passport, documents or money inside baggage. If you
                want to have this procedure, make a statement before travelling.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" className="padding-top-16 font-bold">
                TIPS / TAXES / TICKETS
              </Typography>
            </li>
            <li>
              <Typography variant="body2" className="padding-top-16">
                Tickets to museums and sites during excursions are included. Not
                included any kind of tip, and the tips are at your discretion.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" className="padding-top-16 font-bold">
                TRAVEL DOCUMENTS
              </Typography>
            </li>
            <li>
              <Typography variant="body2" className="padding-top-16">
                Passenger must have valid passport, and visas for the countries
                that require them. Under 18 years old must have an authorization
                letter written and signed by their parents or guardians as such
                document can be requested by any authority. In the case of loss
                of a document for passenger such as hotel voucher, ferries
                tickets, air tickets, etc, we will not be held responsible and
                the penalty that will apply for a new booking and issuance of
                such documents.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" className="padding-top-16 font-bold">
                HEALTH REQUIREMENTS
              </Typography>
            </li>
            <li>
              <Typography variant="body2" className="padding-top-16">
                Any physical or mental disability requiring special attention or
                treatment must be noted at time of reservation.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" className="padding-top-16 font-bold">
                TRAVEL INSURANCE
              </Typography>
            </li>
            <li>
              <Typography variant="body2" className="padding-top-16">
                We recommend for you to purchase full travel insure that will
                cover the entire cost of your trip in case cancellation, trip
                interruption for any reason, etc."
              </Typography>
            </li>
          </ul>
        </Collapse>
      </section>
      <div style={{ marginTop: "48px" }}></div>
    </div>
  );
};

export default Package;
