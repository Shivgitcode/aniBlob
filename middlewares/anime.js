const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

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
  const user = await User.findById(userId).populate("animes");
  const isUser = user.animes.find((el) => el._id.toString() === id);
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
