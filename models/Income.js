const { dbConnection } = require("../configurations");
const { incomeValidator } = require("../validators");

class Income {
  constructor(incomeData) {
    this.incomeData = incomeData;
  }

  save(cb) {
    dbConnection("incomes", async (collection) => {
      try {
        await collection.insertOne(this.incomeData);
        // add success
        cb({
          status: true,
        });
      } catch (err) {
        cb({
          status: false,
          message: err.message,
        });
      }
    });
  }

  static validate(incomeData) {
    try {
      const validationResult = incomeValidator.validate(incomeData);
      return validationResult;
    } catch (err) {
      return false;
    }
  }
}

module.exports = Income;
