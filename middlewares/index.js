const express = require("express");

module.exports = {
  global: (app) => {
    app.use((req, res, next) => {
      return next();
    });

    app.use(express.json());
  },
  
};
