const express = require("express");
const { getSinglePostComments } = require("../controllers/commentController");
const router = express.Router();

const {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  updatePost,
} = require("../controllers/postController");

const authenticatedUser = require("../middleware/authentication");

router
  .route("/")
  .get(authenticatedUser, getAllPosts)
  .post(authenticatedUser, createPost);

router
  .route("/:id")
  .get(authenticatedUser, getSinglePost)
  .delete(authenticatedUser, deletePost)
  .patch(authenticatedUser, updatePost);

router.get("/:id/comments", authenticatedUser, getSinglePostComments);

module.exports = router;
