const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  name: { type: String },
  duration: { type: String },
  url: { type: String },
});

module.exports = mongoose.model("artist", songSchema);
