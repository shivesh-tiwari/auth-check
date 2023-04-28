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

import mysql, { Pool, PoolConnection } from "mysql2/promise";
pool.getConnection()
  .then(async (conn: PoolConnection) => {
    try {
    //   const [rows] = await conn.query("SELECT 1 as val");
    //   console.log(rows); //[ {val: 1}, meta: ... ]
      //Table must have been created before
      // " CREATE TABLE myTable (id int, val varchar(255)) "
      const [res] = await conn.query("INSERT INTO myTable value (?, ?)", [
        3,
        "FInal check",
      ]);
      console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
      pool.releaseConnection(conn);
    } catch (err) {
      // handle error
      console.log(err);
      pool.releaseConnection(conn);
    }
  })
  .catch((err: Error) => {
    // not connected
  });
