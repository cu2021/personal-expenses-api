const { User } = require("../models");
const createError = require("http-errors");

const signup = (req, res, next) => {
  const userData = req.body;

  //user data validation
  const validation = User.validate(userData);
  if (validation.error) {
    return next(createError(400, validation.error.message));
  }

  //check user's existence
  const user = new User(userData);
  user
    .isExist()
    .then((result) => {
      if (result.check) {
        return next(createError(409, result.message));
      }

      // insert not existed user
      user.save((result) => {
        if (result.status) {
          return returnJson(res, 201, result.status, result.message, null);
        } else {
          return next(createError(500, result.message));
        }
      });
    })
    .catch((err) => {
      return next(createError(500, err.message));
    });
};

module.exports = {
  signup,
};
