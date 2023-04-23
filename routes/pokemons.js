const express = require("express");
const pokemons = require("../services/pokemons");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await pokemons.getAll());
  } catch (err) {
    console.error("Error while getting pokemons", err.message);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  next(new Error("404"));
});

router.put("/", async (req, res, next) => {
  next(new Error("404"));
});

router.delete("/", async (req, res, next) => {
  next(new Error("404"));
});

module.exports = router;
