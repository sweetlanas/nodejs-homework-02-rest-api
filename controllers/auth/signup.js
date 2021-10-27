const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../models");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const userAvatar = gravatar.url(email);
  await User.create({
    email,
    password: hashPassword,
    avatarURL: userAvatar,
  });

  res.status(201).json({
    status: "success",
    code: 201,
    message: "Success signup",
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = signup;
