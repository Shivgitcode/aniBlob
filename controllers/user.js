const User = require("../schemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 12);
  const user = await User.create({
    username,
    email,
    password: hashedPass,
  });

  res.send("registered successfully");
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const hash = user.password;
  const id = user._id;
  const isLoggedIn = await bcrypt.compare(password, hash);
  if (isLoggedIn) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET);
    res.cookie("jwt", token);
    res.send("login successfully");
  } else {
    res.send("either username or password is wrong");
  }
};

const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 5, httpOnly: true });
  res.send("logout successfully");
};

module.exports = {
  register,
  login,
  logout,
};
