const express = require("express");
const {
  createAnime,
  showAnimes,
  showAnime,
  updateAnime,
  deleteAnime,
} = require("../controllers/anime");
const { loggedUser, checkUser } = require("../middlewares/anime");
const router = express.Router();

router.get("/home", (req, res) => {
  res.send("This is your home page");
});
router.post("/aniBlob", loggedUser, createAnime);
router.get("/aniBlob", loggedUser, showAnimes);
router.get("/aniBlob/:id", loggedUser, showAnime);
router.put("/aniBlob/:id", loggedUser, checkUser, updateAnime);
router.delete("/aniBlob/:id", loggedUser, checkUser, deleteAnime);

module.exports = router;
