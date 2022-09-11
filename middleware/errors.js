const { StatusCodes } = require("http-status-codes");
const { CustomError } = require("../errors");

const ErrorHandling = async (err, req, res, next) => {
  const error = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, try later",
  };
  if (err.name === "ValidationError") {
    error.message = Object.values(err.errors)
      .map((item) => {
        return item.message;
      })
      .join(",");
    error.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    error.message = `Duplicate value for ${Object.keys(err.keyValue)}`;
    error.statusCode = 400;
  }
  if (err.name === "CastError") {
    error.message = `No item found with id: ${err.value}`;
    error.statusCode = 404;
  }
  return res.status(error.statusCode).json({ msg: error.message });
};

module.exports = ErrorHandling;
