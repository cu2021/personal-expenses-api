const { Router } = require("express");

const { auth } = require("../middlewares");
const { expenseController } = require("../controllers");

const router = Router();

router
  .post("/add", auth, expenseController.addExpense)
  .get(
    "/currentMonthExpenses",
    auth,
    expenseController.getCurrentMonthExpenses
  )
  .get("/currentMonthTotalStatistics",auth, expenseController.getCurrentMonthTotalStatistics);

module.exports = router;
