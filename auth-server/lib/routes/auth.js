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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretKey = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors = require('cors');
const express_1 = __importDefault(require("express"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbAuth_1 = require("../configDb/dbAuth");
const router = express_1.default.Router();
exports.secretKey = "testjsonsecretkey";
const path = require("path");
router.use(cors({ origin: 'http://localhost:3000' }));
router.use(express_1.default.static(path.join(__dirname, "public")));
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const hash = yield bcrypt.hash(password, 10);
        const insertUserSQL = `INSERT INTO users (username, password) VALUES (?, ?)`;
        const insertUserParams = [username, hash];
        const conn = yield dbAuth_1.pool.getConnection();
        yield conn.query(insertUserSQL, insertUserParams);
        console.log(`User '${username}' registered successfully.`);
        res.send(`User '${username}' registered successfully.`);
        conn.end(); // close the connection
    }
    catch (err) {
        console.error("Error registering user:", err);
        res.status(500).send("Internal server error");
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // execute the SQL statement for selecting the user
        const selectUserSQL = `SELECT * FROM users WHERE username = ?`;
        const selectUserParams = [username];
        const conn = yield dbAuth_1.pool.getConnection();
        const rows = yield conn.query(selectUserSQL, selectUserParams);
        conn.end();
        // check if the user exists and the password is correct
        console.log("Row= ", rows);
        if (rows.length === 0) {
            res.status(401).send("Invalid username or password");
            return;
        }
        const user = rows[0];
        console.log("user.password: ", user.Password);
        //debug
        console.log("user is: ", user);
        console.log("password: ", password, "user.password: ", user.Password);
        const result = yield bcrypt.compare(password, user.Password);
        if (result) {
            console.log(`User '${username}' signed in successfully.`);
            // generate a JWT token with the user's username and a secret key
            const token = jwt.sign({ username: user.username }, exports.secretKey, {
                expiresIn: "1h",
            });
            res.send({ token }); // send the token as a JSON response
        }
        else {
            res.status(401).send("Invalid username or password");
        }
    }
    catch (err) {
        console.error("Error selecting user:", err);
        res.status(500).send("Internal server error");
    }
}));
// a middleware to verify JWT tokens
module.exports = router;
