const { ObjectId } = require("bson");
const { Income } = require("../models");
const createError = require("http-errors");
const { returnJson } = require("../my_modules/json_response");

const addIncome = (req, res, next) => {

  const incomeData = req.body;

  incomeData._user_id = req._user_id;
    
  const validation = Income.validate(incomeData);
  
  if (validation.error) {
    return next(createError(400, validation.error.message));
  }

  const income = new Income(validation.value);
  income.incomeData._user_id = new ObjectId(income.incomeData._user_id);

  income.save((result) => {
    // Income insertion error.
    if (!result.status) {
      return next(createError(500));
    }
    return returnJson(res, 200, true, "Income inserted successfully", {income:income.incomeData});
  });
};

module.exports = { addIncome };
