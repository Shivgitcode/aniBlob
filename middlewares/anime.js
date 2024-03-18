const jwt = require("jsonwebtoken");
const User = require("../schemas/user");
const Anime = require("../schemas/aniBlob");

require("dotenv").config();

const loggedUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    next();
  } else {
    res.redirect("/home");
  }
};

const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  const userId = jwt.verify(token, process.env.JWT_SECRET);
  const { id } = req.params;
  const anime = await Anime.findById(id).populate("user");
  console.log(anime);
  console.log(anime.user._id);
  const isUser = anime.user._id.toString() === userId;
  //   console.log(isUser);
  if (isUser) {
    next();
  } else {
    res.send("unauthorized to perform this action");
  }
};

module.exports = {
  loggedUser,
  checkUser,
};
