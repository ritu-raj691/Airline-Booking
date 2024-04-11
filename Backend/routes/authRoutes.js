const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../models/User");
const { generateToken } = require("../utils/auth");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    await db.query(
      "SELECT * FROM userswithrole WHERE email = ?",
      [email],
      async (error, results) => {
        if (error || results.length === 0) {
          res.status(401).json({ error: "Invalid email or password" });
        } else {
          const user = results[0];
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            res.status(401).json({ error: "Invalid email or password" });
          } else {
            const token = generateToken(user);
            res.json({ token });
          }
        }
      }
    );
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }

  //   try {
  //     const user = await User.findOne({ email });
  //     if (!user) {
  //       return res.status(401).json({ error: "Invalid username or password" });
  //     }

  //     const isMatch = await bcrypt.compare(password, user.password);
  //     if (!isMatch) {
  //       return res.status(401).json({ error: "Invalid username or password" });
  //     }

  //     const token = generateToken(user);
  //     res.json({ token });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
});

module.exports = router;
