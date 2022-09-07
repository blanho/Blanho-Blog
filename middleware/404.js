const { StatusCodes } = require("http-status-codes");

const NotFound = async (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "Route doesn't exist" });
};

module.exports = NotFound;
