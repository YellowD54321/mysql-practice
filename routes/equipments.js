const express = require("express");
const equipments = require("../services/equipments");

const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    res.json(await equipments.getMultiple(req.query.page));
  } catch (err) {
    console.error("Error while getting equipments", err.message);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.json(await equipments.create(req.body));
  } catch (err) {
    console.error(`Error while creating equipment`, err.message);
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    res.json(await equipments.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating equipment`, err.message);
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    res.json(await equipments.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting equipment`, err.message);
    next(err);
  }
});

module.exports = router;
