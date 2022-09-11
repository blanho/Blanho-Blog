const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// PostSchema doesn't reference to ReviewSchema but ReviewSchema references to PostSchema
// How do u retrieve all comments of a post -> use Virtual -> Find _id matches with foreignField in ReviewSchema

PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
  justOne: false,
});

module.exports = mongoose.model("Post", PostSchema);
