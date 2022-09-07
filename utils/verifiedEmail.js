const sendMailConfig = require("./sendMail");

const verifiedEmail = async ({
  firstName,
  lastName,
  email,
  verificationToken,
  origin,
}) => {
  const fullName = firstName.concat(lastName);
  const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
  const message = `<p>To verify your email, follow this link: <a href=${verifyEmail}>Verify Email</a></p>`;

  return sendMailConfig({
    to: email,
    subject: "Email Confirmation",
    html: `<h4>Hello ${fullName}
    ${message}
    </h4>`,
  });
};

module.exports = verifiedEmail;
