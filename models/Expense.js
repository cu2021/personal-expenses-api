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

  static validate(expenseData) {
    try {
      const validationResult = expenseValidator.validate(expenseData);
      return validationResult;
    
    }catch (err) {
      return err;
    }
  }
}

module.exports = Expense;
