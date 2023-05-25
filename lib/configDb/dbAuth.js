"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const dotenv = require("dotenv");
dotenv.config();
const mariadb = require("mariadb");
console.log(process.env.HOST);
exports.pool = mariadb.createPool({
    host: "localhost",
    port: 6033,
    user: "docker",
    password: "docker",
    database: "testdb",
    connectionLimit: 5,
});
