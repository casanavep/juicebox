const express = require("express");
const postsRouter = express.Router();
const { requireUser } = require("./utils");
const { getPostById, updatePost, getAllPost, createPost } = require("../db");

postsRouter.post("/", requireUser, async (req, res, next) => {
  const { authorId, title, content, tags = "" } = req.body;
  const tagArr = tags.trim().split(/\s+/);
  const postData = { authorId, title, content };
  // only send the tags if there are some to send
  if (tagArr.length) {
    postData.tags = tagArr;
  }
  try {
    const post = await createPost(postData);
    // this will create the post and the tags for us
    // if the post comes back, res.send({ post });
    // otherwise, next an appropriate error object
  } catch ({ name, message }) {
    next({ name, message });
  }
  next();
});

postsRouter.patch("/:postId", requireUser, async (req, res, next) => {
  const { postId } = req.params;
  const { title, content, tags } = req.body;

  const updateFields = {};

  if (tags && tags.length > 0) {
    updateFields.tags = tags.trim().split(/\s+/);
  }

  if (title) {
    updateFields.title = title;
  }

  if (content) {
    updateFields.content = content;
  }

  try {
    const originalPost = await getPostById(postId);

    if (originalPost.author.id === req.user.id) {
      const updatedPost = await updatePost(postId, updateFields);
      res.send({ post: updatedPost });
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update a post that is not yours",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});
postsRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  res.send({
    posts: [],
  });
  next();
});

module.exports = postsRouter;
