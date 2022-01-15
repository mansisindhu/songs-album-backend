const express = require("express");

const router = express.Router();
const Artists = require("../models/artist.model");

router.get("/", async (req, res) => {
  try {
    const artists = await Artists.find({}).lean().exec();
    return res.status(200).send({ artists });
  } catch (err) {
    return res.status(404).send({ err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const album = await Artists.findById(req.params.id)
      .populate({
        path: "albums",
        populate: {
          path: "songs",
        },
      })
      .lean()
      .exec();
    return res.status(200).send(album);
  } catch (err) {
    return res.status(404).send({ err });
  }
});

module.exports = router;
