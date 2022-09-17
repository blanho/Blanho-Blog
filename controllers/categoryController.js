const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound, UnauthorizedError } = require("../errors");
const Category = require("../models/Category");
const Post = require("../models/Post");

const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new BadRequest("Please provide category name");
  }
  const category = await Category.create({ name });
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Created successfully", category });
};
const getAllCategories = async (req, res) => {
  const categories = await Category.find({});
  res
    .status(StatusCodes.OK)
    .json({ categoriesLength: categories.length, categories });
};
const updateCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  const { name } = req.body;
  const category = await Category.findOneAndUpdate(
    { _id: categoryId },
    { name },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!category) {
    throw new NotFound(`Cannot found this id: ${categoryId}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Updated category successfully", category });
};
const deleteCategory = async (req, res) => {
  const { id: categoryId } = req.params;
  const category = await Category.findOne({ _id: categoryId });

  if (!category) {
    throw new NotFound(`Cannot found this id: ${categoryId}`);
  }

  const categoryInPosts = await Post.findOne({ category: categoryId });
  if (categoryInPosts) {
    throw new UnauthorizedError("Cannot delete this post");
  }

  await category.remove();

  res.status(StatusCodes.OK).json({ msg: "Deleted category successfully" });
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
