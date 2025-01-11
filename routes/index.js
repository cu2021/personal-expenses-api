const {returnJson} = require("../my_modules/json_response")
const authRouter = require("./auth")

module.exports = (app) => {
  app.get("/", (req, res, next)=>{
    return returnJson(res, 200, true,"",null)
  });

  app.use("/auth", authRouter)
};
