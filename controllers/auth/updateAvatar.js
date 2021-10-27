const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../models");
const { sendSuccessRes } = require("../../helpers");

const avatarDir = path.join(__dirname, "../../", "public/avatars");

const updateAvatar = async (req, res) => {
  const { path: tempStorage, originalname } = req.file;
  try {
    const [extention] = originalname.split(".").reverse();

    const originalFile = await Jimp.read(tempStorage);
    await originalFile.resize(250, 250).writeAsync(tempStorage);

    const newFileName = `user_${req.user._id}.${extention}`;
    const resultDir = path.join(avatarDir, newFileName);

    await fs.rename(tempStorage, resultDir);
    const avatar = path.join("/avatars", newFileName);
    console.log(avatar);
    const { avatarUrl } = await User.findByIdAndUpdate(
      req.user._id,
      { avatarUrl: avatar },
      { new: true }
    );
    sendSuccessRes(res, { avatarUrl });
    console.log(res);
  } catch (error) {
    await fs.unlink(tempStorage);
  }
};
module.exports = updateAvatar;
