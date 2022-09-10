const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide your title"],
    minLength: 2,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "Please provide your description"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports = mongoose.model("Post", PostSchema);
