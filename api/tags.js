const express = require("express");
const { getPostsByTagName, getAllTags } = require("../db");
const tagsRouter = express.Router();

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  const { tagName } = req.params;
  console.log("the tag name is: " + tagName);
  if (!tagName) {
    next();
  }
  try {
    const postByTag = await getPostsByTagName(tagName);
    res.send(postByTag);
    next();
  } catch ({ name, message }) {
    // forward the name and message to the error handler
  }
  next();
});
tagsRouter.get("/", async (req, res, next) => {
  try {
    const allTags = await getAllTags();
    // const posts = allPosts.filter((post) => {});
    const tags = allTags.rows;
    res.send({
      tags,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});
tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  res.send({
    tags: [],
  });
  next();
});
module.exports = tagsRouter;
