"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cors = require('cors');
// import path from "path";
// import mime from "mime";
const authoriseRoutes = require('./routes/authoriseRoutes');
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const auth_router = require('./routes/auth');
const app = (0, express_1.default)();
app.use(cors());
const port = 5000;
app.use(express_1.default.json());
app.use('/auth', auth_router);
app.get('/testapi', authoriseRoutes, (req, res) => {
    res.status(201).send('Hi there, Welcome');
});
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
