import {pool} from "../configDb/dbAuth";
import mysql, { Pool, PoolConnection } from "mysql2/promise";
const user_table = `CREATE TABLE IF NOT EXISTS users (
    Username VARCHAR(255) PRIMARY KEY NOT NULL,
    Password VARCHAR(255) NOT NULL
  )
`;
async function createTables(): Promise<void> {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('Connection Created');
    await conn.query(user_table);
    console.log('Table Created');
  } catch (err) {
    throw `The error is ${err}`;
  } finally {
    if (conn) conn.end();
  }
}
createTables();
