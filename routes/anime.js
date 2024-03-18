const express = require("express");
const { createAnime, showAnimes } = require("../controllers/anime");
const loggedUser = require("../middlewares/anime");
const router = express.Router();

router.get("/home", (req, res) => {
  res.send("This is your home page");
});
router.post("/aniBlob", createAnime);
router.get("/aniBlob", loggedUser, showAnimes);

module.exports = router;
