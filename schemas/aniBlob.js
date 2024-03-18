const mongoose = require("mongoose");

const aniBlob = new mongoose.Schema({
  animeName: {
    type: String,
    required: true,
  },
  totalEpisodes: {
    type: Number,
    required: true,
  },
  currentEpisode: {
    type: Number,
    required: true,
  },
  isWatching: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Anime = mongoose.model("Anime", aniBlob);

module.exports = Anime;
