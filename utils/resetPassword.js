const sendMailConfig = require("./sendMail");

const resetPassword = async ({
  firstName,
  lastName,
  email,
  passwordVerificationToken,
  origin,
}) => {
  const fullName = firstName.concat(lastName);
  const resetPassword = `${origin}/user/reset-password?token=${passwordVerificationToken}&email=${email}`;
  const message = `<p>To reset your password, follow this link: <a href=${resetPassword}>Reset Password</a></p>`;

  return sendMailConfig({
    to: email,
    subject: "Reset Password",
    html: `<h4>Hello ${fullName}
    ${message}
    </h4>`,
  });
};

module.exports = resetPassword;
