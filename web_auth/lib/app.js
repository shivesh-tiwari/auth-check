"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const LoginPage_1 = require("./pages/LoginPage");
const RegisterPage_1 = __importDefault(require("./pages/RegisterPage"));
const App = () => {
    return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/login", element: react_1.default.createElement(LoginPage_1.LoginPage, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/register", element: react_1.default.createElement(RegisterPage_1.default, null) }))));
};
exports.default = App;
