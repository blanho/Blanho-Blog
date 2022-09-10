const express = require("express");
const router = express.Router();
const {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyEmail,
} = require("../controllers/authController");
const authenticatedUser = require("../middleware/authentication");

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", authenticatedUser, logout);

router.post("/verify-email", verifyEmail);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);

module.exports = router;
