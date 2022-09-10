const getAllPosts = async (req, res) => {
  res.send("Get All Posts");
};

const createPost = async (req, res) => {
  res.send("create Post");
};

const getSinglePost = async (req, res) => {
  res.send("get single post");
};

const deletePost = async (req, res) => {
  res.send("delete post");
};

const updatePost = async (req, res) => {
  res.send("update post");
};

const uploadImage = async (req, res) => {
  res.send("upload image");
};

module.exports = {
  getAllPosts,
  createPost,
  getSinglePost,
  deletePost,
  uploadImage,
  updatePost,
};
