const express = require("express");
const postsRouter = express.Router();

postsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  res.send({
    posts: [],
  });
  next();
});

module.exports = postsRouter;
