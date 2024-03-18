const Anime = require("../schemas/aniBlob");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../schemas/user");
const AnimeError = require("../errors/AnimeError");

dotenv.config();

const createAnime = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const id = jwt.verify(token, process.env.JWT_SECRET).id;
    const anime = await Anime.create(req.body);
    const user = await User.findById(id);
    user.animes.push(anime);
    user.save();
    res.send("anime created");
  } catch (err) {
    next(new AnimeError(err.message, err.status));
  }
};

const showAnimes = async (req, res) => {
  const token = req.cookies.jwt;
  const id = jwt.verify(token, process.env.JWT_SECRET).id;
  const user = await User.findById(id).populate("animes");
  const animes = user.animes;
  res.send(animes);
};

const deleteAnime = async (req, res) => {
  const { id } = req.params;
  await Anime.findByIdAndDelete(id);
  res.send("Anime deleted successfully");
};

const showAnime = async (req, res) => {
  const token = req.cookies.jwt;
  const { id } = req.params;
  const userid = jwt.verify(token, process.env.JWT_SECRET).id;
  const user = await User.findById(userid).populate("animes");
  const foundAnime = user.animes.find((el) => el._id.toString() === id);
  res.send(foundAnime);
};

const updateAnime = async (req, res) => {
  const { id } = req.params;
  const updatedAnime = await Anime.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.send(updatedAnime);
};

module.exports = {
  createAnime,
  showAnimes,
  deleteAnime,
  showAnime,
  updateAnime,
};
