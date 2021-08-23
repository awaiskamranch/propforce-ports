const { generateUserModel } = require("./User/user.schema");
const { generatePortModel } = require("./Port/port.schema");

function generateModels() {
  const modelTobeGenerated = [generateUserModel(), generatePortModel()];
  Promise.all(modelTobeGenerated).then(() => {
    console.log("Models Generated");
  });
}

module.exports = generateModels;
