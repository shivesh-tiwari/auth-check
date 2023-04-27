const jwt = require("jsonwebtoken");
import express from "express";
const secretKey = require("./auth");
interface AuthenticatedRequest extends express.Request {
  user?: {
    username: string;
    password: string;
  };
}
module.exports = (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).send("Unauthorized user");
    // redirect to login / register page
  }
  console.log("authheader: ", authHeader);

  jwt.verify(authHeader, "testjsonsecretkey", (err: any, user: any) => {
    if (err) {
      return res.status(403).send("Forbidden");
      //redirect to login/signup page
    }
    req.user = user;
    next();
  });
};
