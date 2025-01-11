const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(4).max(10).required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$"))
    .message(
      "The password must be at least length of 8 characters, and should include at least one digit, capital and small letter"
    )
    .required(),
});

module.exports = schema;
