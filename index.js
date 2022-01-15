const express = require("express");
const app = express();

const songsController = require("./src/controllers/songs.controller");
const albumsController = require("./src/controllers/albums.controller");

app.use("/songs", songsController);
app.use("/albums", albumsController);

module.exports = app;
