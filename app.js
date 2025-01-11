const express = require("express");
const middleware = require("./middlewares");
const routes = require("./routes");
const createError = require("http-errors");
const { returnJson } = require("./my_modules/json_response");

app = express();

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
  return returnJson(res, error.statusCode, false, error.message, null);
});

module.exports = app;
