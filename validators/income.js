const Joi = require("@hapi/joi");

const incomeSchema = Joi.object({
  _user_id: Joi.string().required(),
  income_source: Joi.string().required(),
  income_value: Joi.number().min(0).required(),
  currency: Joi.string().default("USD"),
  description: Joi.string().max(500).optional(),
  created_at: Joi.date().default(Date.now()).max("now"),
  month: Joi.number()
    .default(() => {
      return new Date().getMonth() + 1;
    })
    .min(1)
    .max(12),
  year: Joi.number()
    .default(() => {
      return new Date().getFullYear();
    })
    .max(),
});

module.exports = { incomeSchema };
