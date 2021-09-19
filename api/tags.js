const express = require("express");
const { getPostsByTagName } = require("../db");
const tagsRouter = express.Router();

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  res.send({
    tags: [],
  });
  next();
});
tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  const { tagName } = req.body;
  if (!tagName) {
    next();
  }
  try {
    const postByTag = await getPostsByTagName(tagName);
    res.send({
      postByTag: [],
    });
    next();
  } catch ({ name, message }) {
    // forward the name and message to the error handler
  }
  next();
});
module.exports = tagsRouter;
