const express = require("express");
const app = express();

app.use(express.json());

// CORS config
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const songsController = require("./src/controllers/songs.controller");
const albumsController = require("./src/controllers/albums.controller");
const artistsController = require("./src/controllers/artist.controller");

app.use("/songs", songsController);
app.use("/albums", albumsController);
app.use("/artist", artistsController);

module.exports = app;
