const jwt = require("jsonwebtoken");

export default function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Access denied. Token is missing");
  }

  try {
    const decoded = jwt.verify(token, "secret_key");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid token");
  }
}
