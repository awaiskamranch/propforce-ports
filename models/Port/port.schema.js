const Joi = require("joi");
const mongoose = require("mongoose");

const portSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  user: {
    name: String,
  },
});

function generatePortModel() {
  return new Promise((resolve, reject) => {
    try {
      mongoose.model("Port", portSchema);
      resolve();
    } catch (ex) {
      console.log(ex.message);
      reject();
    }
  });
}

module.exports = {
  portSchema,
  generatePortModel,
};
