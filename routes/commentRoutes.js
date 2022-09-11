const express = require("express");
const router = express.Router();

const {
  createComment,
  deleteComment,
  getAllComments,
  getSinglePostComment,
  updateComment,
} = require("../controllers/commentController");

const authenticatedUser = require("../middleware/authentication");

router.route("/").get(getAllComments).post(authenticatedUser, createComment);

router
  .route("/:id")
  .patch(authenticatedUser, updateComment)
  .delete(authenticatedUser, deleteComment);

module.exports = router;
