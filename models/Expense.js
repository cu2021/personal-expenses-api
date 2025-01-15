const { limit } = require("@hapi/joi/lib/common");
const { dbConnection } = require("../configurations");
const { expenseValidator } = require("../validators");

class Expense {
  constructor(expenseData) {
    this.expenseData = expenseData;
  }

  save(cb) {
    dbConnection("expenses", async (collection) => {
      try {
        await collection.insertOne(this.expenseData);
        cb({
          status: true,
          message: "Expense inserted successfully.",
        });
      } catch (err) {
        cb({
          status: false,
          message: err.message,
        });
      }
    });
  }

  static getCurrentMonthExpenses(_user_id, month, year, skip, limit) {
    return new Promise((resolve, reject) => {
      dbConnection("expenses", async (collection) => {
        try {
          const expenses = await collection
            .find({ _user_id: _user_id, month: month, year: year })
            .limit(limit)
            .skip(skip)
            .toArray();

          if (expenses) {
            resolve({ status: true, data: expenses });
          } else {
            resolve({
              status: true,
              data: [],
            });
          }
        } catch (err) {
          reject({ status: false, message: err.message });
        }
      });
    });
  }

  static getEpensesPageCount(_user_id, month, year, limit) {
    return new Promise((resolve, reject) => {
      dbConnection("expenses", async (collection) => {
        try {
          const count = await collection.count({
            _user_id: _user_id,
            month: month,
            year: year,
          });
          const pages = Math.ceil(count / limit);

          resolve({ status: true, pagesCount: pages });
        } catch (err) {
          resolve({ status: false, err });
        }
      });
    });
  }

  static getTotalExpenses(_user_id, month, year) {
    return new Promise((resolve, reject) => {
      dbConnection("expenses", async (collection) => {
        try {
          const expenses = await collection
            .find({ _user_id: _user_id, month: month, year: year })
            .toArray();

          const sum = expenses.reduce(
            (acc, expense) => acc + (expense.amount || 0),
            0
          );

          resolve({ status: true, total: sum });
        } catch (err) {
          reject({ status: false, message: err.message });
        }
      });
    });
  }

  static async getExpenseStatisticsByType(_user_id, month, year) {
    return new Promise((resolve, reject) => {
      dbConnection("expenses", async (collection) => {
        try {
         
          const typeStats = await collection
            .aggregate([
              {
                $match: {
                  _user_id: _user_id,
                  month: month,
                  year: year,
                },
              },
              {
                $group: {
                  _id: "$type",
                  totalAmount: { $sum: "$amount" },
                },
              },
            ])
            .toArray();

          resolve({ status: true, typeStats });
        } catch (err) {
          reject({ status: false, message: err.message });
        }
      });
    });
  }

  static validate(expenseData) {
    try {
      const validationResult = expenseValidator.validate(expenseData);
      return validationResult;
    } catch (err) {
      return err;
    }
  }
}

module.exports = Expense;
