// important imports
const { User } = require("../models");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

//signup function
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

const login = (req, res, next) => {
  User.login(req.body)
    .then((result) => {
      if (result.status) {
        //creat the token using json web token
        const jwtSecreteKey = process.env.PRIVATE_KEY;
        const token = jwt.sign(
          {
            _user_id: result.data._id,
            name: result.data.name
          },
          jwtSecreteKey,{
            expiresIn:"10h"
          }
        );
        // login success
        return returnJson(res, 200, true, "Login Successfully", { token });
      } else {
        return next(createError(400, result.message));
      }
    })
    .catch((err) => {
      return next(createError(500, err.message));
    });
};

module.exports = {
  signup, login
};
