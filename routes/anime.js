const express = require("express");
const {
  createAnime,
  showAnimes,
  showAnime,
  updateAnime,
  deleteAnime,
} = require("../controllers/anime");
const loggedUser = require("../middlewares/anime");
const router = express.Router();

router.get("/home", (req, res) => {
  res.send("This is your home page");
});
router.post("/aniBlob", createAnime);
router.get("/aniBlob", loggedUser, showAnimes);
router.get("/aniBlob/:id", loggedUser, showAnime);
router.put("/aniBlob/:id", loggedUser, updateAnime);
router.delete("/aniBlob/:id", loggedUser, deleteAnime);

module.exports = router;
