const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserByEmail,
} = require("../Models/User/user.model");
const {
  validateUser,
  validateLoginUser,
} = require("../models/User/user.validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getPasswordHash = require("../utility/hash");
const {
  INTERNAL_SERVER_ERROR,
  MISSING_PARAMETERS,
  UNABLE_TO_CREATE_RECORD,
  INVALID_PASSWORD,
} = require("../utility/constants/error");

router.get("/", (req, res) => {
  getUsers()
    .then((result) => res.send(result))
    .catch(() => res.status(500).send(INTERNAL_SERVER_ERROR));
  return;
});

router.post("/", async (req, res) => {
  const result = validateUser(req.body);
  if (result.error) {
    return res.status(400).send(MISSING_PARAMETERS);
  }

  let { name, email, password } = req.body;
  password = getPasswordHash(password)
    .then((hashedPassword) => {
      createUser(name, email, hashedPassword)
        .then((result) => {
          const token = jwt.sign({ ...result }, process.env.JWT_PRIVATE_KEY);
          res.header("x-auth-token", token).send(result);
        })
        .catch(() => res.status(500).send(UNABLE_TO_CREATE_RECORD));
    })
    .catch(() => res.status(500).send(INTERNAL_SERVER_ERROR));

  return;
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const result = validateLoginUser({ email, password });
  if (result.error) {
    return res.status(400).send(MISSING_PARAMETERS);
  }

  getPasswordHash(password)
    .then((hashedPassword) => {
      if (!bcrypt.compare(password, hashedPassword)) {
        return res.status(401).send(INVALID_PASSWORD);
      }

      getUserByEmail(email)
        .then((result) => {
          const token = jwt.sign({ ...result }, process.env.JWT_PRIVATE_KEY);
          res.header("x-auth-token", token).send(result);
        })
        .catch((ex) =>
          res.status(500).send(`${INTERNAL_SERVER_ERROR} - ${ex.message}`)
        );
    })
    .catch((ex) =>
      res.status(500).send(`${INTERNAL_SERVER_ERROR} - ${ex.message}`)
    );

  return;
});

module.exports = router;
