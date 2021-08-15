const jwt = require("jsonwebtoken");
const {
  NO_TOKEN_PROVIDED,
  INVALID_TOKEN,
} = require("../utility/constants/error");
require("dotenv").config();

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send(NO_TOKEN_PROVIDED);

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send(INVALID_TOKEN);
  }
}

module.exports = auth;
 