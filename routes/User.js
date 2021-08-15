const express = require("express");
const router = express.Router();
const { createUser, getUser } = require("../Models/User/user.model");
const validateUser = require("../models/User/user.validator");
const {
  INTERNAL_SERVER_ERROR,
  MISSING_PARAMETERS,
  UNABLE_TO_CREATE_RECORD,
} = require("../utility/constants/error");

router.get("/", (req, res) => {
  getUser()
    .then((result) => res.send(result))
    .catch(() => res.status(500).send(INTERNAL_SERVER_ERROR));
  return;
});

router.post("/", (req, res) => {
  const result = validateUser(req.body);
  if (result.error) {
    return res.status(400).send(MISSING_PARAMETERS);
  }

  const { name, email, password } = req.body;

  createUser(name, email, password)
    .then((result) => res.send(result))
    .catch(() => res.status(500).send(UNABLE_TO_CREATE_RECORD));

  return;
});

module.exports = router;
