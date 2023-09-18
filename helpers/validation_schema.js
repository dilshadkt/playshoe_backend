const Joi = require("joi");

const authSchema = Joi.object({
  username: Joi.string().alphanum().required(),
  password: Joi.string().min(2).required(),
});
const registerSchema = Joi.object({
  username: Joi.string().alphanum().max(25).min(3).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
  confirmPass: Joi.ref("password"),
});
module.exports = { authSchema, registerSchema };
