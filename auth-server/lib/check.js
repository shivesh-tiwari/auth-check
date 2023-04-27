"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
exports.pool.getConnection()
    .then((conn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   const [rows] = await conn.query("SELECT 1 as val");
        //   console.log(rows); //[ {val: 1}, meta: ... ]
        //Table must have been created before
        // " CREATE TABLE myTable (id int, val varchar(255)) "
        const [res] = yield conn.query("INSERT INTO myTable value (?, ?)", [
            3,
            "FInal check",
        ]);
        console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
        exports.pool.releaseConnection(conn);
    }
    catch (err) {
        // handle error
        console.log(err);
        exports.pool.releaseConnection(conn);
    }
}))
    .catch((err) => {
    // not connected
});
