const { ObjectId } = require("bson");
const { Expense } = require("../models");
const createError = require("http-errors");
const { returnJson } = require("../my_modules/json_response");

const addExpense = (req, res, next) => {
  const expenseData = req.body;

  expenseData._user_id = req._user_id;

  // validate inputted expenseData
  const validation = Expense.validate(expenseData);
  
  //check validation error
  if (validation.error) {    
    return next(createError(400, validation.error.message));
  }

  const expense = new Expense(validation.value);
  expense.expenseData._user_id = new ObjectId(expense.expenseData._user_id);

  expense.save((result) => {
    // Income insertion error.
    if (!result.status) {
      return next(createError(500));
    }
    // Income insertion succeed.
    return returnJson(res, 200, true, "Expense inserted successfully", {
      expense: expense.expenseData,
    });
  });
};

module.exports = { addExpense };
