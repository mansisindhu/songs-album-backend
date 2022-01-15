const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  name: { type: String },
  genre: { type: String },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "song" }],
  year: { type: Number },
});

module.exports = mongoose.model("songAlbum", albumSchema);
