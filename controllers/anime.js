const Anime = require("../schemas/aniBlob");

const createAnime = async (req, res) => {
  try {
    const anime = await Anime.create(req.body);
    res.send("anime created");
  } catch (err) {
    next(new AnimeError(err.message, err.status));
  }
};

const showAnimes = async (req, res) => {
  const animes = await Anime.find({});
  res.send(animes);
};

const showAnime = async (req, res) => {};
