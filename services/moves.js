const db = require("./db");
const config = require("../config");

const getMoves = async () => {
  const moves = await db.query(`SELECT * FROM moves`);
  const data = moves || [];
  return {
    data,
    meta: {},
  };
};

const getLevelMovesByPokemonId = async (pokemonId) => {
  const moves = await db.query(`
        SELECT pokemons.id, pokemons.pokedex, pokemon_level_move.move_id, pokemon_level_move.require_level
        FROM pokemons
        INNER JOIN pokemon_level_move ON pokemon_level_move.pokemon_id = pokemons.id
        WHERE pokemons.id = ${pokemonId}
        ORDER BY pokemon_level_move.require_level
    `);

  const data = moves || [];
  return {
    data,
    meta: {},
  };
};

const getMachineMovesByPokemonId = async (pokemonId) => {
  const moves = await db.query(`
        SELECT pokemons.id, pokemons.pokedex, pokemon_machine_move.move_id, pokemon_machine_move.machine_id
        FROM pokemons
        INNER JOIN pokemon_machine_move ON pokemon_machine_move.pokemon_id = pokemons.id
        WHERE pokemons.id = ${pokemonId}
        ORDER BY pokemon_machine_move.machine_id
    `);

  const data = moves || [];
  return {
    data,
    meta: {},
  };
};

module.exports = {
  getMoves,
  getLevelMovesByPokemonId,
  getMachineMovesByPokemonId,
};
