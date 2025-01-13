const Joi = require("@hapi/joi");

const schema = Joi.object({
  _user_id: Joi.string().required(),
  incomeSource: Joi.string().required(),
  incomeValue: Joi.number().min(0).required(),
  currency: Joi.string().default("USD"),
  description: Joi.string().max(500).optional(),
  date: Joi.date()
    .default(Date.now())
    .max("now")
    .message("income recieved date mustn't be in the future"),
});

module.exports = schema;
