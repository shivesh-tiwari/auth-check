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
const dbAuth_1 = require("../configDb/dbAuth");
const user_table = `CREATE TABLE IF NOT EXISTS users (
    Username VARCHAR(255) PRIMARY KEY NOT NULL,
    Password VARCHAR(255) NOT NULL
  )
`;
function createTables() {
    return __awaiter(this, void 0, void 0, function* () {
        let conn;
        try {
            conn = yield dbAuth_1.pool.getConnection();
            console.log('Connection Created');
            yield conn.query(user_table);
            console.log('Table Created');
        }
        catch (err) {
            throw `The error is ${err}`;
        }
        finally {
            if (conn)
                conn.end();
        }
    });
}
createTables();
