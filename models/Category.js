const mongoose = require("mongoose");

const CategorySChema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide category"],
    unique: true,
    minLength: 2,
  },
});

module.exports = mongoose.model("Category", CategorySChema);
