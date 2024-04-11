// server.js

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const dataRoutes = require("./routes/dataRoutes");
const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Routes
app.use("/admin", authRoutes);
app.use("/admin", dataRoutes);

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: "localhost",
//   user: "root",
//   password: "mysql",
//   database: "FLIGHT_BOOKING",
//   port: "3306",
// });

// // Test the connection
// pool.getConnection((err, connection) => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//     return;
//   }
//   console.log("Connected to MySQL database");
//   connection.release();
// });

// // User login endpoint
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     pool.query(
//       "SELECT * FROM userswithrole WHERE email = ?",
//       [email],
//       async (error, results) => {
//         if (error || results.length === 0) {
//           res.status(401).json({ error: "Invalid email or password" });
//         } else {
//           const user = results[0];
//           const passwordMatch = await bcrypt.compare(password, user.password);
//           if (!passwordMatch) {
//             res.status(401).json({ error: "Invalid email or password" });
//           } else {
//             const token = jwt.sign(
//               { userId: user.id, role: user.role, email: user.email },
//               "secret_key"
//             );
//             res.json({ token });
//           }
//         }
//       }
//     );
//   } catch (error) {
//     console.error("Error logging in:", error);
//     res.status(500).json({ error: "Error logging in" });
//   }
// });

// // Middleware to verify JWT token
// function verifyToken(req, res, next) {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(403).json({ error: "Access denied. Token required" });
//   }

//   jwt.verify(token, "secret_key", (error, decoded) => {
//     if (error) {
//       return res.status(401).json({ error: "Invalid token" });
//     }

//     req.user = decoded;
//     next();
//   });
// }

// // Protected route accessible only to admin role
// app.get("/admin/generalinfo", verifyToken, (req, res) => {
//   console.log("testtttttt");
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ error: "Access denied" });
//   }

//   res.json({ message: "Admin route accessed successfully" });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
