const express = require("express");
const middleware = require("./middlewares");
const routes = require("./routes");
const createError = require("http-errors");
const { returnJson } = require("./my_modules/json_response");
//make returnJson global
global.returnJson = returnJson;

//create express application
app = express();

/**
 * Handling Unhandled Rejection
 */
process.on("unhandledRejection", (reason) => {
  console.log(reason);
  process.exit(1);
});

/**
 * middlewares
 */
middleware.global(app);

/**
 * Routes
 */
routes(app);

/**
 * Not Found Handler
 */
app.use((req, res, next) => {
  const error = createError(404);
  return next(error);
});

/**
 * Error Handler
 */
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  return returnJson(res, statusCode, false, error.message, null);
});


module.exports = app;
