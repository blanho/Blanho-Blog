const express = require("express");
const router = express.Router();
const {
  changePassword,
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyEmail,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", changePassword);

module.exports = router;
