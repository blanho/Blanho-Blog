const { BaseError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

class UnauthorizedError extends BaseError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
module.exports = UnauthorizedError;
