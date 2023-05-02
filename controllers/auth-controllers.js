const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const jimp = require("jimp");

const path = require("path");
const avatarsDir = path.resolve("public", "avatars");

const { User } = require("../models/user");
const { HttpError, renemeUploadFile } = require("../helpers");
const { controllerWrapper } = require("../utils");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcryptjs.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcryptjs.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({});
};

const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};
const updateAvatar = async (req, res) => {
  const { file } = req;
  await renemeUploadFile(file, avatarsDir);

  const { _id } = req.user;
  const avatarURL = path.join("avatars", file.filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  jimp
    .read(`public/${avatarURL}`)
    .then((filename) => {
      return filename.resize(250, 250).quality(50).write(`public/${avatarURL}`);
    })
    .catch((err) => {
      console.error(err);
    });

  res.status(200).json({
    avatarURL,
  });
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  current: controllerWrapper(current),
  updateAvatar: controllerWrapper(updateAvatar),
};
