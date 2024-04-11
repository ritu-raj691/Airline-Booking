const jwt = require("jsonwebtoken");

const generateToken = (User = {}) => {
  const { email, userId, role } = User || {};
  return jwt.sign({ email, userId, role }, "secret_key", { expiresIn: "30m" });
};

const verifyToken = (req, res, next) => {
  const token =
    req?.headers?.authorization && req.headers.authorization.split(" ")[1];
  console.log("token", token);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: missing token" });
  }

  jwt.verify(token, "secret_key", (err, decoded) => {
    console.log("decoded", decoded);
    console.log("err", err);
    if (err) {
      return res.status(401).json({ error: "Unauthorized: invalid token" });
    }

    req.email = decoded?.email;
    next();
  });
};

module.exports = { generateToken, verifyToken };
