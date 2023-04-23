const db = require("./db");
const config = require("../config");
const basicPokemons = require("./pokemons");

const getAll = async () => {
  const pokemons = await db.query(`SELECT * FROM live_pokemons`);
  const data = pokemons || [];
  return {
    data,
    meta: {},
  };
};

const create = async (params) => {
  const { region, position } = params; // maybe do this in the future
  if (!position) {
    throw { status: 400, message: "postion should be a valid value." };
  }
  const res = await basicPokemons.getAll();
  const pokemons = res.data;
  const pokemonAmount = pokemons.length;
  const randomIndex = Math.floor(Math.random() * pokemonAmount);
  const MAX_IV = 32;
  const IVs = {
    hp: Math.floor(Math.random() * MAX_IV),
    atk: Math.floor(Math.random() * MAX_IV),
    def: Math.floor(Math.random() * MAX_IV),
    satk: Math.floor(Math.random() * MAX_IV),
    sdef: Math.floor(Math.random() * MAX_IV),
    spe: Math.floor(Math.random() * MAX_IV),
  };
  const pokemon = pokemons[randomIndex];

  console.log("pokemons", pokemons);
  console.log("pokemon", pokemon);

  const pokemonId = pokemon.id;
  const result = await db.query(`
          INSERT INTO live_pokemons
              (pokemon_id, iv_hp, iv_atk, iv_def, iv_satk, iv_sdef, iv_spe, position)
              VALUES(
                  ${pokemonId},
                  ${IVs.hp},
                  ${IVs.atk},
                  ${IVs.def},
                  ${IVs.satk},
                  ${IVs.sdef},
                  ${IVs.spe},
                  ${position}
              )
      `);
  let message = "Error in creating live pokemon";
  if (result.affectedRows) {
    message = "Live pokemon created successfully";
  }
  return { message };
};

const update = async (livePokemonId, params) => {
  const { position } = params;
  const result = await db.query(
    `UPDATE live_pokemons
              SET position="${position}"
              WHERE id=${livePokemonId}`
  );
  let message = "Error in updating live pokemon";
  if (result.affectedRows) {
    message = "Live pokemon updated successfully";
  }
  return { message };
};

const remove = async (livePokemonId) => {
  const result = await db.query(
    `DELETE FROM live_pokemons
            WHERE id=${livePokemonId}`
  );
  if (result.affectedRows) {
    message = "Live pokemon deleted successfully";
  }

  return { message };
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
