const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

userSchema.method.generateAuthToken = () => {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY);
};

function generateUserModel() {
  return new Promise((resolve, reject) => {
    try {
      mongoose.model("User", userSchema);
      resolve();
    } catch (ex) {
      console.log(ex.message);
      reject();
    }
  });
}

module.exports = {
  userSchema,
  generateUserModel,
};
