const { UnauthenticatedError } = require("../errors");
const Token = require("../models/Token");
const { verifyToken, attachJWTtoCookies } = require("../utils/jwt");
attachJWTtoCookies;

const authenticatedUser = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;
  try {
    if (accessToken) {
      const payload = verifyToken(accessToken);
      req.user = payload;
      next();
    } else {
      const payload = verifyToken(refreshToken);
      const existingToken = await Token.findOne({
        refreshToken: payload.refreshToken,
        user: payload.user.userId,
      });

      if (!existingToken || !existingToken?.isValid) {
        throw new UnauthenticatedError("Invalid Authentication");
      }
      attachJWTtoCookies({
        res,
        userPayload: payload.user,
        refreshToken: existingToken.refreshToken,
      });
      req.user = payload.user;
      next();
    }
  } catch (error) {
    throw new UnauthenticatedError("Invalid Authentication");
  }
};

module.exports = authenticatedUser;
