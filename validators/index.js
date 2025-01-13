const { schema, loginSchema } = require("./user");
const { incomeSchema } = require("./income");
const { expenseSchema } = require("./expense");

module.exports = {
  userValidator: schema,
  loginValidator: loginSchema,
  incomeValidator: incomeSchema,
  expenseValidator: expenseSchema,
};
