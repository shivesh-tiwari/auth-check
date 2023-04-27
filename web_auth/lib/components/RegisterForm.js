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
const react_1 = __importDefault(require("react"));
const RegisterForm = ({ onSubmit }) => {
    const [username, setUsername] = react_1.default.useState('');
    const [password, setPassword] = react_1.default.useState('');
    const handleSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        try {
            yield onSubmit(username, password);
        }
        catch (error) {
            console.error(error);
        }
    });
    return (react_1.default.createElement("form", { onSubmit: handleSubmit },
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "username" }, "Username"),
            react_1.default.createElement("input", { type: "text", id: "username", value: username, onChange: (event) => setUsername(event.target.value) })),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "password" }, "Password"),
            react_1.default.createElement("input", { type: "password", id: "password", value: password, onChange: (event) => setPassword(event.target.value) })),
        react_1.default.createElement("button", { type: "submit" }, "Register")));
};
exports.default = RegisterForm;
