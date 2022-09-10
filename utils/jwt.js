const jwt = require("jsonwebtoken");

const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY);
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

const attachJWTtoCookies = ({ res, userPayload, refreshToken }) => {
  const accessTokenJWT = signToken({ ...userPayload });
  const refreshTokenJWT = signToken({ user: { ...userPayload }, refreshToken });

  const thirtyMins = 1000 * 60 * 30;
  const oneMonth = 1000 * 60 * 60 * 24 * 30;

  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    signed: true,
    expires: new Date(Date.now() + thirtyMins),
  });
  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    signed: true,
    expires: new Date(Date.now() + oneMonth),
  });
};

module.exports = { signToken, verifyToken, attachJWTtoCookies };
