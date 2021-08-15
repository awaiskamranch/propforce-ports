const Joi = require("joi");

function validatePort(body) {
  const schema = {
    name: Joi.string().min(3).required(),
    user: Joi.object({
      name: Joi.string().min(5),
    }).optional(),
  };
  return Joi.validate(body, schema);
}

module.exports = validatePort;
