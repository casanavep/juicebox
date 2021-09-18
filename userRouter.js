const { response } = require("express");
const express = require("express");
const server = express();

server.use("/users");

server.get("/", (req, res) => {
  response.send("this stupid thing works");
});
