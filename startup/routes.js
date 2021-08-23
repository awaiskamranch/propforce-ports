const express = require("express");
var cors = require("cors");
const port = require("../routes/port");
const user = require("../routes/user");

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use("/api/user", user);
  app.use("/api/port", port);
};
