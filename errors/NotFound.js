const { StatusCodes } = require("http-status-codes");
const CustomError = require("./CustomError");
class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
module.exports = NotFound;
