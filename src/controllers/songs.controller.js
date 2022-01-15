const express = require("express");

const router = express.Router();
const Songs = require("../models/song.model");

router.get("/", async (req, res) => {
  try {
    const songs = await Songs.find({}).lean().exec();
    return res.status(200).send({ songs, len: songs.length });
  } catch (err) {
    return res.send(404).send({ err });
  }
});

router.post("/", async (req, res) => {
  try {
    const song = await Songs.create(req.body);
    return res.status(201).send({ song });
  } catch (err) {
    return res.send(404).send({ err });
  }
});

module.exports = router;
