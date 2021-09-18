const express = require("express");
const apiRouter = require("./api");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { client } = require("./db");

client.connect();
const server = express();
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use("/api", apiRouter);

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
