const User = require("../models/User");
const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");
const { BadRequest } = require("../errors");
const sendVerification = require("../utils/verifiedEmail");

const register = async (req, res, next) => {
  const { firstName, lastName, password, email } = req.body;

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new BadRequest("Email already exists");
  }

  const isCreated = (await User.countDocuments({})) === 0;
  const role = isCreated ? "admin" : "author";
  const verificationToken = crypto.randomBytes(40).toString("hex");

  const user = await User.create({
    firstName,
    lastName,
    password,
    email,
    role,
    verificationToken,
  });
  const origin = "http://localhost:3000";

  sendVerification({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  res.status(StatusCodes.CREATED).json({
    msg: "Please check the email to verify your account",
  });
};

const login = async (req, res) => {
  res.send("login");
};

const verifyEmail = async (req, res) => {
  res.send("Verify email");
};

const forgotPassword = async (req, res) => {
  res.send("forgotPassword");
};

const resetPassword = async (req, res) => {
  res.send("resetPassword");
};

const changePassword = async (req, res) => {
  res.send("changePassword");
};
const logout = async (req, res) => {
  res.send("logout");
};

module.exports = {
  register,
  changePassword,
  forgotPassword,
  login,
  logout,
  resetPassword,
  verifyEmail,
};
