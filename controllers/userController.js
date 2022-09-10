const { StatusCodes } = require("http-status-codes");
const {
  UnauthenticatedError,
  BadRequest,
  NotFound,
  UnauthorizedError,
} = require("../errors");
const User = require("../models/User");
const checkAuthorization = require("../utils/checkAuthorization");
const createUserPayload = require("../utils/createUserPayload");
const { attachJWTtoCookies } = require("../utils/jwt");

const getAllUsers = async (req, res) => {
  const user = await User.find({ role: "author" });
  res.status(StatusCodes.OK).json({ user });
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id }).select("-password");
  if (!user) {
    throw new NotFound(`No user with id: ${id} found`);
  }
  checkAuthorization(req.user, user);
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    throw new BadRequest("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new UnauthorizedError("You don't have permission to access");
  }

  user.firstName = firstName;
  user.lastName = lastName;

  await user.save();

  const userPayload = createUserPayload(user);

  attachJWTtoCookies({ res, userPayload });
  res.status(StatusCodes.OK).json({ user: userPayload });
};

const changePasswordUser = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new BadRequest("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new UnauthenticatedError("Invalid Authentication, Please log in");
  }

  const isPassword = await user.comparePassword(oldPassword);

  if (!isPassword) {
    throw new UnauthenticatedError("Please provide an valid password");
  }

  user.password = newPassword;
  await user.save();

  return res
    .status(StatusCodes.OK)
    .json({ msg: "Update Password Successfully" });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });

  if (!user) {
    throw new NotFound(`No user with id: ${id} found`);
  }

  const deletedUser = await User.findByIdAndDelete({ _id: id });
  res
    .status(StatusCodes.OK)
    .json({
      msg: "Success! Delete user successfully",
      deletedUser: deletedUser,
    });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  changePasswordUser,
  showCurrentUser,
  deleteUser,
};
