"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const LoginForm = ({ handleSubmit, username, setUsername, password, setPassword, }) => {
    const [error, setError] = (0, react_1.useState)("");
    const handleFormSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        try {
            const response = yield axios_1.default.post("http://localhost:5000/auth/login", {
                username,
                password,
            });
            console.log(response.data); // do something with the response
        }
        catch (error) {
            console.error(error);
            setError("Something went wrong. Please try again later.");
        }
    });
    return (react_1.default.createElement("form", { onSubmit: handleSubmit || handleFormSubmit },
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "username" }, "Username"),
            react_1.default.createElement("input", { type: "text", id: "username", value: username, onChange: (event) => setUsername(event.target.value) })),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "password" }, "Password"),
            react_1.default.createElement("input", { type: "password", id: "password", value: password, onChange: (event) => setPassword(event.target.value) })),
        react_1.default.createElement("button", { type: "submit" }, "Login"),
        error && react_1.default.createElement("div", null, error)));
};
exports.default = LoginForm;
