const express = require("express");
const { getPostsByTagName } = require("../db");
const tagsRouter = express.Router();

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  const { tagName } = req.body;
  console.log("the tag name is: " + tagName);
  if (!tagName) {
    next();
  }
  try {
    const postByTag = await getPostsByTagName(name);
    res.send({ postByTag: [] });
    next();
  } catch ({ name, message }) {
    // forward the name and message to the error handler
  }
  next();
});
tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  res.send({
    tags: [],
  });
  next();
});
module.exports = tagsRouter;
