const { returnJson } = require("../my_modules/json_response");
const authRouter = require("./auth");
const incomeRouter = require("./income")
const expenseRouter =require('./expense')

module.exports = (app) => {
  app.get("/", (req, res, next) => {
    return returnJson(res, 200, true, "", null);
  });

  app.use("/auth", authRouter);
  app.use("/income",incomeRouter)
  app.use("/expense",expenseRouter)
};
