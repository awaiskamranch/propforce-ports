const { generateUserModel } = require("./user/user.schema.js");
const { generatePortModel } = require("./port/port.schema.js");

function generateModels() {
  const modelTobeGenerated = [generateUserModel(), generatePortModel()];
  Promise.all(modelTobeGenerated).then(() => {
    console.log("Models Generated");
  });
}

module.exports = generateModels;
