const nodemailer = require("nodemailer");
const mailTransporter = require("./transporter");

const sendMailConfig = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport(mailTransporter);

  await transporter.sendMail({
    from: "h.baolan20022@gmail.com",
    to,
    subject,
    html,
  });
};

module.exports = sendMailConfig;
