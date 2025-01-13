const { Router } = require("express");

const { auth } = require("../middlewares");
const { expenseController } = require("../controllers");

const router = Router();

router.post("/add", auth, expenseController.addExpense);

module.exports = router;
