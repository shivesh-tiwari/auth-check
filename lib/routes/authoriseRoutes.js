"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const secretKey = require("./auth");
module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).send("Unauthorized user");
        // redirect to login / register page
    }
    console.log("authheader: ", authHeader);
    jwt.verify(authHeader, "testjsonsecretkey", (err, user) => {
        if (err) {
            return res.status(403).send("Forbidden");
            //redirect to login/signup page
        }
        req.user = user;
        next();
    });
};
