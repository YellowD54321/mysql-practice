const mysql = require("mysql2/promise");
const config = require("../config");

const query = async (sql, params = []) => {
  const connection = await mysql.createConnection(config.db);
  const [rows, fields] = await connection.execute(sql, params);
  return rows;
};

module.exports = {
  query,
};
