const { Router } = require("express");

const { auth } = require("../middlewares");
const { incomeController } = require("../controllers");

const router = Router();

router.post("/add", auth, incomeController.addIncome);

module.exports = router;
