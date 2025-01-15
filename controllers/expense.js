const { ObjectId } = require("bson");
const { Expense, Income } = require("../models");
const createError = require("http-errors");

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

const getCurrentMonthExpenses = async (req, res, next) => {
  //get the page number from the query parameters
  const pageNum = parseInt(req.query.page);

  //get the current month, and year
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  //get the user id from auth
  const _user_id = new ObjectId(req._user_id);

  //check the page number ti be not empty
  if (isNaN(pageNum)) {
    return next(createError(400, "You should send a page number"));
  }

  // define the page limit
  const limit = 3;
  const skip = (pageNum - 1) * limit;

  try {
    //get pages count
    const getPagesCount = await Expense.getEpensesPageCount(
      _user_id,
      month,
      year,
      limit
    );

    if (getPagesCount.status) {
      //check the inserted page number is not larger than the total pages number
      if (pageNum <= getPagesCount.pagesCount && pageNum > 0) {
        Expense.getCurrentMonthExpenses(_user_id, month, year, skip, limit)
          .then((result) => {
            if (result.status) {
              return returnJson(res, 200, result.status, "", result.data, {
                pages_count: getPagesCount.pagesCount,
                current_page: pageNum,
              });
            }
          })
          .catch((err) => {
            return next(createError(500, err.message));
          });
      } else {
        return next(createError(404, "Page Not Found!"));
      }
    } else {
      return next(createError(500, getPagesCount.err.message));
    }
  } catch (err) {
    return next(createError(500, err.message));
  }
};

const getCurrentMonthTotalStatistics = async (req, res, next) => {
  //get the current month, and year
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  //get the user id from auth
  const _user_id = new ObjectId(req._user_id);

  //the output object
  currentMonthFinancialAnalysis = {};

  try {
    //get the total expenses
    const totalExpensesAmount = await Expense.getTotalExpenses(
      _user_id,
      month,
      year
    );

    //add it to the analysis object
    currentMonthFinancialAnalysis.totalExpenses = totalExpensesAmount.total;

    // get the total income amount
    const incomeAmount = await Income.getUserMonthlyIncome(
      _user_id,
      month,
      year
    );

    //add it to the analysis object
    currentMonthFinancialAnalysis.totalIncome = incomeAmount.incomeValue;

    // calculating the reamining income as:
    // remaining = income - total expenses
    const remainingIncome =
      currentMonthFinancialAnalysis.totalIncome -
      currentMonthFinancialAnalysis.totalExpenses;

    // add the remaining to the analysis object.
    currentMonthFinancialAnalysis.remainingIncome = remainingIncome;

    // determine the total number of days in the month
    const daysInMonth = new Date(year, month, 0).getDate();
    // claculating the average daily expenses using this equation:
    //  avg. daily expenses = total expenses / days of the month
    const averageDailyExpenses = parseFloat(
      (currentMonthFinancialAnalysis.totalExpenses / daysInMonth).toFixed(2)
    );
    // add the avg. daily expenses the analysis object
    currentMonthFinancialAnalysis.averageDailyExpenses = averageDailyExpenses;
    // return the resulted analysis object
    return returnJson(res, 200, true, "", { currentMonthFinancialAnalysis });
  } catch (err) {
    return next(createError(500, err.message));
  }
};
module.exports = {
  addExpense,
  getCurrentMonthExpenses,
  getCurrentMonthTotalStatistics,
};
