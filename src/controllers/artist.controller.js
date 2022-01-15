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

router.post("/login", async (req, res) => {
  try {
    const findArtist = await Artists.findOne({ email: req.body.email })
      .populate({
        path: "albums",
        populate: {
          path: "songs",
        },
      })
      .lean()
      .exec();

    if (!findArtist) {
      return res
        .status(200)
        .send({ message: "Not a valid artist", error: true });
    }

    if (req.body.password !== findArtist.password) {
      return res
        .status(200)
        .send({ message: "Not a valid artist", error: true });
    }

    return res.status(200).send({ ...findArtist, error: false });
  } catch (err) {
    return res.status(401).send({});
  }
});

router.patch("/:id", async (req, res) => {
  try {
    await Artists.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    const findArtist = await Artists.findById(req.params.id)
      .populate({
        path: "albums",
        populate: {
          path: "songs",
        },
      })
      .lean()
      .exec();

    res.status(200).send({ ...findArtist, error: false });
  } catch (err) {
    return res.status(404).send({ err });
  }
});

module.exports = router;
