const NotFound = require("./NotFound");
const UnauthenticatedError = require("./Unauthenticated");
const UnauthorizedError = require("./Unauthorized");
const BadRequest = require("./BadRequest");
const CustomError = require("./CustomError");

module.exports = {
  NotFound,
  UnauthenticatedError,
  UnauthorizedError,
  BadRequest,
  CustomError,
};
