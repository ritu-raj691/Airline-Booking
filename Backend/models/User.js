const mysql = require("mysql");

const db = mysql.createConnection({
  connectionLimit: 10,
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "mysql",
  database: process.env.DB_NAME || "FLIGHT_BOOKING",
  port: "3306",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

module.exports = db;

// module.exports = {
//   findOne: (query) => {
//     return new Promise((resolve, reject) => {
//       db.query(
//         "SELECT * FROM userswithrole WHERE email = ?",
//         query?.email,
//         (err, results) => {
//           if (err) reject(err);
//           resolve(results[0]);
//         }
//       );
//     });
//   },
// };
