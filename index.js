const express = require("express");
const pokemonRouter = require("./routes/pokemons");
const livePokemonRouter = require("./routes/livePokemons");

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/pokemons", pokemonRouter);
app.use("/live-pokemons", livePokemonRouter);

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({
    message: err.message,
  });
  return;
});

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});

// const connection = new mysql.createConnection(config);

// connection.connect();

// connection.query("SELECT * FROM base_items", function (err, rows, fields) {
//   if (err) throw err;
//   console.log(rows);
// });

// connection.end();
