require("dotenv").config();
const express = require("express");
const apiRouter = require("./api");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { client } = require("./db");
const jwt = require("jsonwebtoken");

console.log("our ServerKey is: " + process.env.JWT_SECRET);

// const token = jwt.sign({ id: 3, username: "joshua" }, "server secret");
// token; // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Impvc2h1YSIsImlhdCI6MTU4ODAyNDQwNn0.sKuQjJRrTjmr0RiDqEPJQcTliB9oMACbJmoymkjph3Q'
// const recoveredData = jwt.verify(token, "server secret");
// recoveredData; // { id: 3, username: 'joshua', iat: 1588024406 }

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
