const createUserPayload = (user) => {
  const fullName = user.firstName.concat(" ", user.lastName);
  return { fullName, userId: user._id, role: user.role };
};

module.exports = createUserPayload;
