require("dotenv").config();
const bcrypt = require("bcrypt");

async function getPasswordHash(password) {
  const salt = await bcrypt.genSalt(parseInt(process.env.DEFAULT_SALT_VALUE));
  return await bcrypt.hash(password, salt);
}

module.exports = getPasswordHash;
