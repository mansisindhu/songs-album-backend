const express = require("express");

const router = express.Router();
const Albums = require("../models/album.model");

router.get("/", async (req, res) => {
  try {
    const albums = await Albums.find({}).lean().exec();
    return res.status(200).send({ albums, len: albums.length });
  } catch (err) {
    return res.status(404).send({ err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const album = await Albums.findById(req.params.id)
      .populate("songs")
      .lean()
      .exec();
    return res.status(200).send(album);
  } catch (err) {
    return res.status(404).send({ err });
  }
});

router.post("/", async (req, res) => {
  try {
    const album = await Albums.create(req.body);
    return res.status(201).send({ album });
  } catch (err) {
    return res.send(404).send({ err });
  }
});

module.exports = router;
