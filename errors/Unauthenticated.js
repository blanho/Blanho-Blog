const { BaseError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

class UnauthenticatedError extends BaseError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
module.exports = UnauthenticatedError;
