const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers");

const { User } = require("../../models");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const userAvatar = gravatar.url(email);

  const verifyToken = nanoid();
  await User.create({
    email,
    password: hashPassword,
    avatarURL: userAvatar,
    verifyToken,
  });

  const data = {
    to: email,
    subject: "Email verification",
    html: `
            <a href="http://localhost:3000/api/auth/verify/${verifyToken}" target="_blank">Подтвердить почту</a>
            `,
  };

  await sendEmail(data);

  res.status(201).json({
    status: "success",
    code: 201,
    message: "Success signup",
    user: {
      email,
      subscription: "starter",
      verifyToken,
    },
  });
};

module.exports = signup;
