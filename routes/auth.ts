import dotenv from 'dotenv';
dotenv.config();
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
import express from 'express';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { pool } from '../configDb/dbAuth';
const auth_router = express.Router();
export const secretKey = 'testjsonsecretkey';
const path = require('path');

auth_router.use(cors());
auth_router.post('/register', async (req, res) => {
  // const { username, password } = req.body;
  const { username, email, password } = req.body;

  try {
    if (username.length < 8 || email.length < 8) {
      res.status(400).json({ message: `Invalid Username or Email` });
      return;
    }
    if (password.length < 8) {
      res.status(422).json({ message: `Password must be 8 or more characters long` });
      return;
    }
    const hash = await bcrypt.hash(password, 10);

    //const insertUserSQL = `INSERT INTO users (username, password) VALUES (?,?)`;
    const checkExistingUserSQL = `Select * from authuser where username = ?`;
    const insertUserSQL = `INSERT INTO authuser (username, email, password,apikeys) VALUES (?,?,?,?)`;
    const apiKey = uuidv4();
    //const insertUserParams = [username, hash];
    const insertUserParams = [username, email, hash, JSON.stringify([apiKey])];
    const conn = await pool.getConnection();
    const verifyExistingUser = await conn.query(checkExistingUserSQL, username);
    if (verifyExistingUser.length != 0) {
      res.status(409).json({ message: `User ${username} already exists` });
      return;
    }
    await conn.query(insertUserSQL, insertUserParams);
    console.log(`User '${username}' registered successfully.`);
    const api_key_response = await conn.query(
      `select json_extract(apikeys,'$') as apikeys from authuser where username='${username}'`
    );
    res.json({
      message: `User '${username}' registered successfully`,
      apikey: `${api_key_response[0].apikeys}`,
    });
    conn.end(); // close the connection
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
auth_router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // execute the SQL statement for selecting the user
    const selectUserSQL = `SELECT * FROM authuser WHERE username = ?`;
    const selectUserParams = [username];
    const conn = await pool.getConnection();
    const rows = await conn.query(selectUserSQL, selectUserParams);
    conn.end();

    // check if the user exists and the password is correct
    console.log('Row= ', rows);

    if (rows.length === 0) {
      res.status(401).json({ message: `Invalid Username or password` });
      return;
    }
    const user = rows[0];
    console.log('user.password: ', user.password);

    //debug
    console.log('user is: ', user);

    console.log('password: ', password, 'user.password: ', user.password);

    const result = await bcrypt.compare(password, user.password);
    if (result) {
      console.log(`User '${username}' signed in successfully.`);

      // generate a JWT token with the user's username and a secret key
      const token = jwt.sign({ username: user.username }, secretKey, {
        expiresIn: '1h',
      });
      res.header('Authorization', `Bearer ${token}`);
      res.status(200).json({ mesage: `Bearer ${token}` }); // send the token as a header
    } else {
      res.status(401).json({ message: `Invalid Username or Email` });
    }
  } catch (err) {
    console.error('Error selecting user:', err);
    res.status(500).json({ message: `Internal Server Error` });
  }
});

module.exports = auth_router;
