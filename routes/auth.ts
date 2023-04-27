import dotenv from "dotenv";
dotenv.config();
const cors=require('cors');
import express from "express";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { pool } from "../configDb/dbAuth";
const router = express.Router();
export const secretKey = "testjsonsecretkey";
const path = require("path");

router.use(cors({origin:'http://localhost:3000'}));
router.use(express.static(path.join(__dirname, "public")));
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    const insertUserSQL = `INSERT INTO users (username, password) VALUES (?, ?)`;
    const insertUserParams = [username, hash];
    const conn = await pool.getConnection();
    await conn.query(insertUserSQL, insertUserParams);

    console.log(`User '${username}' registered successfully.`);
    res.send(`User '${username}' registered successfully.`);
    conn.end(); // close the connection
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send("Internal server error");
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // execute the SQL statement for selecting the user
    const selectUserSQL = `SELECT * FROM users WHERE username = ?`;
    const selectUserParams = [username];
    const conn = await pool.getConnection();
    const rows = await conn.query(selectUserSQL, selectUserParams);
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

    const result = await bcrypt.compare(password, user.Password);
    if (result) {
      console.log(`User '${username}' signed in successfully.`);

      // generate a JWT token with the user's username and a secret key
      const token = jwt.sign({ username: user.username }, secretKey, {
        expiresIn: "1h",
      });
      res.send({ token }); // send the token as a JSON response
    } else {
      res.status(401).send("Invalid username or password");
    }
  } catch (err) {
    console.error("Error selecting user:", err);
    res.status(500).send("Internal server error");
  }
});

// a middleware to verify JWT tokens

module.exports = router;
