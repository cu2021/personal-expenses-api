const {returnJson} = require("../my_modules/json_response")

module.exports = (app) => {
  app.get("/", (req, res, next)=>{
    return returnJson(res, 200, true,"",null)
  });
};
