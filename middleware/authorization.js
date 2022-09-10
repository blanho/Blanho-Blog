const { UnauthorizedError } = require("../errors");

const userAuthorization = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Cannot access this route");
    }
    next();
  };
};

module.exports = userAuthorization;
