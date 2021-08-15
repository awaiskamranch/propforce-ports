const mongoose = require("mongoose");
const { portSchema } = require("./port.schema");

const Port = mongoose.model("Port", portSchema);

async function createPort(name, user = null) {
  const port = new Port({ name, user });

  try {
    const result = await port.save();
    return result;
  } catch (ex) {
    return ex.message;
  }
}

module.exports = {
  createPort,
};
