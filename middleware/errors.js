const { StatusCodes } = require("http-status-codes");

const ErrorHandling = async (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, try later",
  };
  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((item) => {
        return item.message;
      })
      .join(",");
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value for ${Object.keys(err.keyValue)}`;
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    customError.message = `No item found with id: ${err.value}`;
    customError.statusCode = 404;
  }
  return res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = ErrorHandling;
