const { BadRequest } = require("http-errors");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const verifyResending = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequest("missing required field email");
  }

  const user = await User.findOne({ email });
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const data = {
    to: email,
    subject: "Email verification",
    html: `<a href='http://localhost:3000/api/auth/verify/${user.verifyToken}' target='_blank'>Please confirm your email</a>`,
  };
  await sendEmail(data);

  res.status(200).json({
    status: "Success",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = verifyResending;
