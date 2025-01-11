require("dotenv").config();
const http = require("http");
const express = require("express");

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log("Server is listen now");
});
