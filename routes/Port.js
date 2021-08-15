const express = require("express");
const router = express.Router();
const { createPort } = require("../Models/Port/port.model");
const validatePort = require("../models/Port/port.validator");
const {
  INTERNAL_SERVER_ERROR,
  MISSING_PARAMETERS,
  UNABLE_TO_CREATE_RECORD,
} = require("../utility/constants/error");

router.get("/", (req, res) => {
  getPort()
    .then((result) => res.send(result))
    .catch(() => res.status(500).send(INTERNAL_SERVER_ERROR));
  return;
});

router.post("/", (req, res) => {
  const result = validatePort(req.body);
  if (result.error) {
    return res.status(400).send(`${MISSING_PARAMETERS} - ${result.error}`);
  }

  const { name, user } = req.body;

  createPort(name, user)
    .then((result) => res.send(result))
    .catch((error) =>
      res.status(500).send(`${UNABLE_TO_CREATE_RECORD} - ${error}`)
    );

  return;
});

module.exports = router;
