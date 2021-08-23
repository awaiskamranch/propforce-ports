const express = require("express");
const connectToMongoDB = require("./startup/mongodb");
const app = express();
require("./startup/routes")(app);
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 2000;
app.listen(port, () =>
  console.log(`Propforce Port Listening to port ${port} ....`)
);

connectToMongoDB();
