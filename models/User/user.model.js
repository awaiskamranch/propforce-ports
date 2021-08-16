const mongoose = require("mongoose");
const { userSchema } = require("./user.schema");

const User = mongoose.model("User", userSchema);

async function createUser(name, email, password) {
  const user = new User({ name, email, password });

  try {
    const result = await user.save();
    return result;
  } catch (ex) {
    console.log(ex.message);
  }
}

async function getUsers() {
  try {
    const users = await User.find({})
      .sort({ name: 1 })
      .select({ name: 1, email: 1 });

    return users;
  } catch (ex) {
    console.log(ex.message);
  }
}

async function getUserByEmail(email) {
  try {
    const user = await User.findOne({
      email,
    }).select({ name: 1, email: 1 });

    return user;
  } catch (ex) {
    console.log(ex.message);
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserByEmail,
};
