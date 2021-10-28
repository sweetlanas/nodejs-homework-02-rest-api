const nodemailer = require("nodemailer");

const { EMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "lazareva.svetlana@meta.ua",
    pass: EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: "lazareva.svetlana@meta.ua",
  };
  await transporter.sendMail(email);
};

module.exports = sendEmail;
