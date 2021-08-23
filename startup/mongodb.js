const mongoose = require("mongoose");
const generateModels = require("../models/initialize");
const {
  UNABLE_TO_CONNECT_DB,
  CONNECTED_TO_DB,
} = require("../utility/constants/error");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

function connectToMongoDB() {
  //const mongoDbPath = process.env.MONGO_DB_PATH;
  const mongoDbPath = process.env.PRODUCTION_MONGO_DB_PATH;
  mongoose
    .connect(mongoDbPath, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log(CONNECTED_TO_DB);
      generateModels();
    })
    .catch((error) => console.error(UNABLE_TO_CONNECT_DB, error));
}

module.exports = connectToMongoDB;
