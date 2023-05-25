const dotenv = require("dotenv");
dotenv.config();
const mariadb = require("mariadb");

console.log(process.env.HOST);
export const pool = mariadb.createPool({
  host: "localhost",
  port: 6033,
  user: "docker",
  password: "docker",
  database: "testdb",
  connectionLimit: 5,
});
