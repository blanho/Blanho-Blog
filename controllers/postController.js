const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound } = require("../errors");
const Category = require("../models/Category");
const Post = require("../models/Post");
const { checkCustomAuthorization } = require("../utils/checkAuthorization");
const path = require("path");

const getAllPosts = async (req, res) => {
  const post = await Post.find({}).select("-category -user");
  res.status(StatusCodes.OK).json({ postLength: post.length, post });
};

const createPost = async (req, res) => {
  const { title, description, categoryId, image } = req.body;
  if (!title || !description || !categoryId) {
    throw new BadRequest("Please provide all values");
  }
  const category = await Category.findOne({ _id: categoryId });
  if (!category) {
    throw new NotFound(`Cannot found this id: ${categoryId}`);
  }
  const post = await Post.create({
    title,
    description,
    user: req.user.userId,
    category: categoryId,
    image,
  });
  res.status(StatusCodes.CREATED).json({ msg: "Create Successfully", post });
};

const getSinglePost = async (req, res) => {
  const { id: postId } = req.params;

  const post = await Post.findOne({ _id: postId }).select("-category -user");
  if (!post) {
    throw new NotFound(`No user with id: ${postId} found`);
  }

  res.status(StatusCodes.OK).json({ post });
};

const deletePost = async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findOne({ _id: postId });

  if (!post) {
    throw new NotFound(`Cannot found this id: ${postId}`);
  }

  checkCustomAuthorization(req.user, post);

  await post.remove();

  res
    .status(StatusCodes.OK)
    .json({ msg: "Deleted category successfully", post });
};

const updatePost = async (req, res) => {
  const { id: postId } = req.params;
  const { title, description } = req.body;
  if (!title || !description) {
    throw new BadRequest("Please provide all values");
  }
  //   Find requested user matches with user creating post in postSchema
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    throw new NotFound(`Cannot found this id: ${postId}`);
  }
  checkCustomAuthorization(req.user, post);

  post.title = title;
  post.description = description;

  await post.save();

  res
    .status(StatusCodes.OK)
    .json({ msg: "Updated category successfully", post });
};

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequest("No file uploaded");
  }
  const postImage = req.files.image;
  if (!postImage.mimetype.startsWith("image")) {
    throw new BadRequest("Please upload your image");
  }
  const maxSize = 1024 * 1024;
  if (postImage.size > maxSize) {
    throw new BadRequest("Please upload image smaller than 1MB");
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${postImage.name}`
  );
  await postImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${postImage.name}` });
};

module.exports = {
  getAllPosts,
  createPost,
  getSinglePost,
  deletePost,
  uploadImage,
  updatePost,
};
