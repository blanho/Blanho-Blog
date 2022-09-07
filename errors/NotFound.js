const { BaseError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

class NotFound extends BaseError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
module.exports = NotFound;
