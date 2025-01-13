const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];

  if (!token) {
    return next(createError(401));
  }

  try {
    const decode = jwt.verify(token, process.env.PRIVATE_KEY);

    req._user_id = decode._user_id;
    return next();
  } catch (err) {
    return next(createError(401));
  }
};
