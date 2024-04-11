const express = require("express");
const router = express.Router();
const db = require("../models/User");
const { verifyToken } = require("../utils/auth");

router.post("/generalinfo", verifyToken, async (req, res) => {
  const {
    departureCity,
    arrivalCity,
    departureTime,
    arrivalTime,
    duration,
    departureTerminal,
    arrivalTerminal,
    nextDay,
  } = req.body;
  const email = req.email; // Extracted from the token in middleware
  console.log("req.body", req.body);
  console.log("email", email);

  try {
    db.query(
      "INSERT INTO flight_departure (departure_city, arrival_city, departure_time, arrival_time, duration, departure_terminal, arrival_terminal, next_day, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        departureCity,
        arrivalCity,
        departureTime,
        arrivalTime,
        duration,
        departureTerminal,
        arrivalTerminal,
        nextDay,
        email,
      ],
      (err, result) => {
        if (result.affectedRows === 1) {
          return res
            .status(201)
            .json({ message: "Flight data inserted successfully" });
        } else {
          throw new Error("Failed to insert flight data");
        }
      }
      
    );
  } catch (error) {
    console.error("Error inserting flight data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  res.json({ message: "Data stored successfully" });
});

module.exports = router;
