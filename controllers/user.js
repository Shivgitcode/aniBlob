const User = require("../schemas/user");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")

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
    const{username,password}=req.body
    const user=await User.findOne({username})
    const hash=user.password
    const isLoggedIn=
};
