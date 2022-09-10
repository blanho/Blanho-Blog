const express = require("express");
const router = express.Router();

const {
  changePasswordUser,
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authenticatedUser = require("../middleware/authentication");
const authorizePermissions = require("../middleware/authorization");

router.get("/", authenticatedUser, authorizePermissions("admin"), getAllUsers);

router.get("/showUser", authenticatedUser, showCurrentUser);

router.patch("/updateUser", authenticatedUser, updateUser);

router.patch("/changePassword", authenticatedUser, changePasswordUser);

router.get("/:id", authenticatedUser, getSingleUser);

router.delete(
  "/:id",
  authenticatedUser,
  authorizePermissions("admin"),
  deleteUser
);

module.exports = router;
