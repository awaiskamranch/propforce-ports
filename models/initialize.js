const { generateUserModel } = require("./models/user/user.schema");
const { generatePortModel } = require("./models/port/port.schema");

function generateModels() {
  const modelTobeGenerated = [generateUserModel(), generatePortModel()];
  Promise.all(modelTobeGenerated).then(() => {
    console.log("Models Generated");
  });
}

module.exports = generateModels;
