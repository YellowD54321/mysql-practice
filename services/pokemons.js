const db = require("./db");
const config = require("../config");

const getAll = async () => {
  const pokemons = await db.query(`SELECT * FROM pokemons`);
  const data = pokemons || [];
  return {
    data,
    meta: {},
  };
};

const getByPokedex = async (pokedex) => {
  const pokemon = await db.query(
    `SELECT * FROM pokemons WHERE pokedex=${pokedex}`
  );
  return {
    data: pokemon,
    meta: {},
  };
};

module.exports = {
  getAll,
  getByPokedex,
};
