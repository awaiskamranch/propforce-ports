const Joi = require("joi");

function validateUser(body) {
  const schema = {
    name: Joi.string().min(5).required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  };
  return Joi.validate(body, schema);
}

function validateLoginUser(body) {
  const schema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
  };
  return Joi.validate(body, schema);
}

module.exports = {
  validateUser,
  validateLoginUser,
};
