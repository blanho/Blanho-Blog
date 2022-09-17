const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound } = require("../errors");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const { checkCustomAuthorization } = require("../utils/checkAuthorization");

const createComment = async (req, res) => {
  const { comment, post: postId } = req.body;
  if (!comment) {
    throw new BadRequest("Please provide your comment");
  }
  const posting = await Post.findOne({ _id: postId });
  if (!posting) {
    throw new NotFound(`Cannot found this post with id: ${posting}`);
  }

  const postComment = await Comment.create({
    comment,
    post: postId,
    user: req.user.userId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Created Successfully", postComment });
};

const getAllComments = async (req, res) => {
  const postComment = await Comment.find({}).populate({
    path: "post",
    select: "title description",
  });

  res.status(StatusCodes.OK).json({ postComment });
};

const updateComment = async (req, res) => {
  const { id: commentId } = req.params;
  const { comment } = req.body;
  if (!comment) {
    throw new BadRequest("Please provide your comment");
  }

  const postComment = await Comment.findOne({ _id: commentId });

  if (!postComment) {
    throw new NotFound(`Cannot found this comment with id: ${commentId}`);
  }

  checkCustomAuthorization(req.user, postComment);

  postComment.comment = comment;
  await postComment.save();

  res.status(StatusCodes.OK).json({ msg: "Updated Successfully", postComment });
};

const deleteComment = async (req, res) => {
  const { id: commentId } = req.params;
  const postComment = await Comment.findOne({ _id: commentId });
  if (!postComment) {
    throw new NotFound(`Cannot found this comment with id: ${commentId}`);
  }

  checkCustomAuthorization(req.user, postComment);
  await postComment.remove();

  res.status(StatusCodes.OK).json({ msg: "Deleted Successfully", postComment });
};
// To retrieve all comments of single post additionally
const getSinglePostComments = async (req, res) => {
  const { id: postId } = req.params;

  const singlePost = await Post.findOne({ _id: postId });
  if (!singlePost) {
    throw new NotFound(`Cannot found this post with id: ${postId}`);
  }

  const comments = await Comment.find({ post: postId });
  res
    .status(StatusCodes.OK)
    .json({ commentsLength: comments.length, comments });
};

module.exports = {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
  getSinglePostComments,
};
