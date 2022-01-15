const express = require("express");
const app = express();

app.use(express.json());

const songsController = require("./src/controllers/songs.controller");
const albumsController = require("./src/controllers/albums.controller");
const artistsController = require("./src/controllers/artist.controller");

app.use("/songs", songsController);
app.use("/albums", albumsController);
app.use("/artists", artistsController);

module.exports = app;
