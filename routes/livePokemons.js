const express = require("express");
const livePokemons = require("../services/livePokemons");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await livePokemons.getAll());
  } catch (err) {
    console.error("Error while getting live pokemons", err.message);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.json(await livePokemons.create(req.body));
  } catch (err) {
    console.error("Error while creating live pokemon", err.message);
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    res.json(await livePokemons.update(req.params.id, req, body));
  } catch (err) {
    console.error("Error while updating live pokemon", err.message);
    next(err);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    res.json(await livePokemons.remove(req.params.id));
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
