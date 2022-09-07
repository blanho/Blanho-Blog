const { BaseError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

class BadRequest extends BaseError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
module.exports = BadRequest;
