import dotenv from "dotenv";
const cors=require('cors');
// import path from "path";
// import mime from "mime";
const authoriseRoutes = require("./routes/authoriseRoutes");
dotenv.config();
import express from "express";
const router = require("./routes/auth");
const app = express();
app.use(cors({origin:'http://localhost:3000'}));
const port = 5000;
app.use(express.json());
app.use("/auth", router);
app.get("/testapi", authoriseRoutes, (req, res) => {
  res.status(201).send("Hi there, Welcome");
});
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
