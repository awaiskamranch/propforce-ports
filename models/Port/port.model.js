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

async function getPorts() {
  try {
    const ports = await Port.find({})
      .sort({ name: 1 })
      .select({ name: 1, user: 1 });

    return ports;
  } catch (ex) {
    console.log(ex.message);
  }
}

async function updatePort(_id, name = null) {
  const port = await Port.updateOne(
    { _id },
    {
      $set: {
        "user.name": name,
      },
    }
  );
  return port;
}

module.exports = {
  createPort,
  getPorts,
  updatePort,
};
