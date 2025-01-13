const { dbConnection } = require("../configurations");
const { incomeValidator } = require("../validators");

class Income {
  constructor(incomeData) {
    this.incomeData = incomeData;
  }

  save(cb) {
    dbConnection("incomes", async (collection) => {
      try {
        // Check if income already exists for the same user and month
        const existingIncome = await collection.findOne({
          userId: this.incomeData.userId,
          month: this.incomeData.month,
          year: this.incomeData.year
        });

        if (existingIncome) {
          // If income exists then update it
          await collection.updateOne(
            { _id: existingIncome._id },
            { $set: this.incomeData }
          );
          cb({
            status: true,
            message: "Income updated successfully.",
          });
        } else {
          // If no income exists then insert it
          await collection.insertOne(this.incomeData);
          cb({
            status: true,
            message: "Income inserted successfully.",
          });
        }
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
