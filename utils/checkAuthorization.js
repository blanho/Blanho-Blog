const { UnauthorizedError } = require("../errors");

const checkAuthorization = (incomingUser, currentUser) => {
  if (incomingUser.role === "admin") return;
  if (incomingUser.userId !== currentUser._id.toString()) return;
  throw UnauthorizedError("Cannot access this route");
};

module.exports = checkAuthorization;
