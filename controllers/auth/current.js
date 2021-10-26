const { User } = require("../../models");
const { sendSuccessResponse } = require("../../helpers");
const { Unauthorized } = require("http-errors");

const current = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id, "_id email subscription");

  if (!user) {
    throw new Unauthorized("Not authorized");
  }

  sendSuccessResponse(res, { data: { user } }, 200);
};

module.exports = current;
