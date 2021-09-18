const express = require("express");
const tagsRouter = express.Router();

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  res.send({
    tags: [],
  });
  next();
});

module.exports = tagsRouter;
