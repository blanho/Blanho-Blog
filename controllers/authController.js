const User = require("../models/User");
const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, UnauthenticatedError } = require("../errors");
const sendVerification = require("../utils/verifiedEmail");
const { STATUS_CODES } = require("http");
const createUserPayload = require("../utils/createUserPayload");
const { attachJWTtoCookies } = require("../utils/jwt");
const Token = require("../models/Token");

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

  res.status(StatusCodes.OK).json({
    msg: "Please check the email to verify your account",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPassword = await user.comparePassword(password);
  if (!isPassword) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const origin = "http://localhost:3000";
  if (!user.verified) {
    sendVerification({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      verificationToken: user.verificationToken,
      origin,
    });
    throw new UnauthenticatedError("Please verify your email");
  }
  const userPayload = createUserPayload(user);

  let refreshToken = "";
  const existingRefreshToken = await Token.findOne({ user: user._id });

  if (existingRefreshToken) {
    if (!existingRefreshToken.isValid) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    refreshToken = existingRefreshToken.refreshToken;

    attachJWTtoCookies({ res, userPayload, refreshToken });
    res.status(StatusCodes.OK).json({ msg: "success", user: userPayload });
  } else {
    const ip = req.ip;
    const userAgent = req.headers["user-agent"];
    refreshToken = crypto.randomBytes(40).toString("hex");
    await Token.create({ userAgent, refreshToken, ip, user: user._id });

    attachJWTtoCookies({ res, userPayload, refreshToken });

    res.status(StatusCodes.OK).json({ msg: "success", user: userPayload });
  }
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Verification Failed");
  }

  if (user.verificationToken !== verificationToken) {
    throw new UnauthenticatedError("Verification Failed");
  }

  user.verificationToken = "";
  user.verified = Date.now();
  user.isVerified = true;

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Verified Email successfully" });
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
  await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
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
