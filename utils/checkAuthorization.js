const { UnauthorizedError } = require("../errors");

const checkAuthorization = (incomingUser, currentUser) => {
  if (incomingUser.role === "admin") return;
  if (incomingUser.userId === currentUser._id.toString()) return;
  throw new UnauthorizedError("You don't have permission to do it");
};

const checkCustomAuthorization = (incomingUser, currentUser) => {
  if (incomingUser.role === "admin") return;
  if (incomingUser.userId === currentUser.user.toString()) return;
  throw new UnauthorizedError("You don't have permission to do it");
};

module.exports = { checkAuthorization, checkCustomAuthorization };
