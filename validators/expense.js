const Joi = require("@hapi/joi");

const ExpenseType = Object.freeze({
  TRANSPORTATION: "transportation",
  FOOD: "food",
  MEDICINE: "medicine",
  RENTING: "rent",
});

const expenseSchema = Joi.object({
  _user_id: Joi.string().required(),
  amount: Joi.number().min(1).required(),
  type: Joi.string()
    .valid(...Object.values(ExpenseType))
    .messages({
      "any.only":
        "Invalid expense type '{{#value}}'. Allowed values are [food, transportation, medicine, rent].",
    })
    .required(),
  month: Joi.number().default(() => {
    return new Date().getMonth() + 1;
  }),
  year: Joi.number().default(() => {
    return new Date().getFullYear();
  }),
  created_at: Joi.date().default(Date.now()).max("now"),
});

module.exports = { expenseSchema };
