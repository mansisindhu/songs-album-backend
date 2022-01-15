const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  albums: [{ type: mongoose.Schema.Types.ObjectId, ref: "songAlbum" }],
  password: { type: String },
  url: { type: String },
});

module.exports = mongoose.model("artist", artistSchema);
