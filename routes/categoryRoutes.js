const express = require("express");
const router = express.Router();

const {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} = require("../controllers/categoryController");

const authenticatedUser = require("../middleware/authentication");
const authorizePermissions = require("../middleware/authorization");

router
  .route("/")
  .post([authenticatedUser, authorizePermissions("admin")], createCategory)
  .get([authenticatedUser, authorizePermissions("admin")], getAllCategories);

router
  .route("/:id")
  .patch([authenticatedUser, authorizePermissions("admin")], updateCategory)
  .delete([authenticatedUser, authorizePermissions("admin")], deleteCategory);

module.exports = router;
