const { User } = require("../../models");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const avatarPath = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const imageName = `${_id}_${originalname}`;
  try {
    await Jimp.read(tempUpload)
      .then((img) => {
        return img.resize(250, 250).write(tempUpload);
      })
      .catch((err) => {
        console.error(err);
      });

    const resultUpload = path.join(avatarPath, imageName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        avatarUrl: avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    next(error);
  }
};

module.exports = updateAvatar;
