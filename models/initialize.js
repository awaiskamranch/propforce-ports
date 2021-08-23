const { generateUserModel } = require("../models/User/user.schema");
const { generatePortModel } = require("../models/Port/port.schema");

function generateModels() {
  const modelTobeGenerated = [generateUserModel(), generatePortModel()];
  Promise.all(modelTobeGenerated).then(() => {
    console.log("Models Generated");
  });
}

module.exports = generateModels;
