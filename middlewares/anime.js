const loggedUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    next();
  } else {
    res.redirect("/home");
  }
};

module.exports = loggedUser;
