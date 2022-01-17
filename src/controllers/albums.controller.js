const express = require("express");
const router = express.Router();

const Albums = require("../models/album.model");

router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 3;
    const offset = (page - 1) * size;

    const sortBy = req.query.sortBy;
    const genre = req.query.genre;

    if (!genre) {
      const albums = await Albums.find({})
        .skip(offset)
        .limit(size)
        .sort({ year: sortBy === "old-to-new" ? 1 : -1 })
        .lean()
        .exec();
      const totalCount = await Albums.find().countDocuments();
      const totalPages = Math.ceil(totalCount / size);
      return res.status(200).send({ albums, totalPages });
    } else {
      const albums = await Albums.find({ genre })
        .skip(offset)
        .limit(size)
        .sort({ year: sortBy === "old-to-new" ? 1 : -1 })
        .lean()
        .exec();
      const totalCount = await Albums.find({ genre }).countDocuments();
      const totalPages = Math.ceil(totalCount / size);
      return res.status(200).send({ albums, totalPages });
    }
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
