import React, { useState, useEffect } from "react";
import { Button, Typography, Popover, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ITravelers } from "../../Model/Filters";
import "./PassengerSelector.css";

interface IPassengerSelector {
  selectedPassengers?: (travelers: ITravelers) => void;
}

const PassengerSelector = (props: IPassengerSelector) => {
  const { selectedPassengers } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);
  const [selectedTravelers, setSelectedTravelers] = useState<string>("");
  const [error, setError] = useState<string>("");
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    selectedPassengers && selectedPassengers({ adults, children, infants }); //Setting default number of passengers(Help in travelers details page)
  }, []);

  useEffect(() => {
    setError("");
    constructNoOfTravelersString();
    if (adults <= infants) {
      setError("Number of infants should be less than or equal to adults.");
    }
  }, [adults, children, infants]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    selectedPassengers && selectedPassengers({ adults, children, infants });
    setAnchorEl(null);
  };

  const handleIncrement = (setter: Function) => {
    setter((prevValue: any) => prevValue + 1);
  };

  const handleDecrement = (setter: Function) => {
    setter((prevValue: any) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  const constructNoOfTravelersString = () => {
    const adultString: string =
      adults < 2 ? adults + " adult" : adults + " adults";
    const childrenString: string =
      children === 0
        ? ""
        : children < 2
        ? children + " children"
        : children + " childrens";
    const infantString: string =
      infants === 0
        ? ""
        : infants < 2
        ? infants + " infant"
        : infants + " infants";
    let finalString: string = adultString;
    if (children) {
      finalString = finalString + ", " + childrenString;
    }
    if (infants) {
      finalString = finalString + ", " + infantString;
    }
    setSelectedTravelers(finalString);
  };

  return (
    <div>
      <TextField
        id="travelers-label"
        label="Number of Travelers"
        InputLabelProps={{
          style: { color: "white" },
        }}
        className="no-of-travelers margin-top-8"
        onClick={handleClick}
        value={selectedTravelers}
        InputProps={{
          readOnly: true,
        }}
        style={{
          width: infants > 0 && children > 0 ? "264px" : "190px",
        }}
      ></TextField>
      {open && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          className="pop-over"
        >
          <div className="flex-column">
            <div className="adults">
              <Typography variant="caption">Adults(12+)</Typography>
              <div className="counters">
                <Button
                  variant="outlined"
                  onClick={() => handleDecrement(setAdults)}
                  startIcon={<RemoveIcon />}
                  className="subtract"
                  disabled={adults === 1 || infants >= adults}
                ></Button>
                <Button variant="outlined">{adults}</Button>
                <Button
                  variant="outlined"
                  onClick={() => handleIncrement(setAdults)}
                  startIcon={<AddIcon />}
                  className="add"
                ></Button>
              </div>
            </div>
            <div className="children">
              <Typography variant="caption">Children(2 - 11)</Typography>
              <div className="counters">
                <Button
                  variant="outlined"
                  onClick={() => handleDecrement(setChildren)}
                  startIcon={<RemoveIcon />}
                  className="subtract"
                  disabled={children === 0}
                ></Button>
                <Button variant="outlined">{children}</Button>
                <Button
                  variant="outlined"
                  onClick={() => handleIncrement(setChildren)}
                  startIcon={<AddIcon />}
                  className="add"
                ></Button>
              </div>
            </div>
            <div className="infants">
              <Typography variant="caption">Infants(&lt;2)</Typography>
              <div className="counters">
                <Button
                  variant="outlined"
                  onClick={() => handleDecrement(setInfants)}
                  startIcon={<RemoveIcon />}
                  className="subtract"
                  disabled={infants === 0}
                ></Button>
                <Button variant="outlined">{infants}</Button>
                <Button
                  variant="outlined"
                  disabled={infants >= adults}
                  onClick={() => handleIncrement(setInfants)}
                  startIcon={<AddIcon />}
                  className="add"
                ></Button>
              </div>
            </div>
            <div className="btn-done">
              {error && (
                <Typography
                  variant="caption"
                  color="#c17503"
                  style={{ fontSize: "12px", maxWidth: "60%" }}
                >
                  {error}
                </Typography>
              )}
              <Button variant="contained" onClick={handleClose}>
                Done
              </Button>
            </div>
          </div>
        </Popover>
      )}
    </div>
  );
};

export default PassengerSelector;
