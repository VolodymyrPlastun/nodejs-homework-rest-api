const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require('gravatar');
const {v4} = require('uuid');
const sendEmail = require('../../helpers/sendEmail');

const register = async (req, res) => {
  const { email, password } = req.body;
  const avatarURL = gravatar.url(email);
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const verificationToken = v4();
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({ email, password: hashPassword, avatarURL, verificationToken });

  const mail = {
    to: email,
    subject: 'Подтверждение почты',
    html: `<a href="https://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Подтвердите почту</a>`
  }
  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      email,
      subscription: result.subscription,
      avatarURL,
      verificationToken
    },
  });
};

module.exports = register;
