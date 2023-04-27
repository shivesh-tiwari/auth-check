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
const RegisterForm_1 = __importDefault(require("../components/RegisterForm"));
function RegisterPage() {
    const handleRegister = (username, password) => __awaiter(this, void 0, void 0, function* () {
        // Make a POST request to the registration endpoint with the user's name, email, and password
        try {
            const response = yield fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            // Handle the response
            const data = yield response.json();
            console.log(data);
        }
        catch (error) {
            console.error(error);
        }
    });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Register"),
        react_1.default.createElement(RegisterForm_1.default, { onSubmit: handleRegister })));
}
exports.default = RegisterPage;
