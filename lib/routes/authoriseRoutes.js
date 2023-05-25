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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const secretKey = require('./auth');
module.exports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('auth header-1: ', req.header('Authorization'));
    let authHeader = req.header('Authorization');
    if (!authHeader) {
        const redirectUrl = req.query.redirectUrl;
        console.log('req.query.redirectUrl : ', req.query.redirectUrl);
        if (redirectUrl) {
            const state = yield JSON.parse(req.query.state);
            console.log('response.data(state) : ', state);
            if (state && state.token) {
                authHeader = `${state.token}`;
            }
        }
        console.log('auth-header-2', authHeader);
        if (!authHeader) {
            return res.redirect(307, 'http://localhost:3000/login?redirectUrl=http://localhost:4723/device-farm');
            // Redirect to login / register page with the redirectUrl query parameter
        }
    }
    console.log('auth-header-3 ', authHeader);
    jwt.verify(authHeader, 'testjsonsecretkey', (err, user) => {
        if (err) {
            return res.redirect(307, 'http://localhost:3000/login?redirectUrl=http://localhost:4723/device-farm');
            // Redirect to login/signup page with the redirectUrl query parameter
        }
        req.user = user;
        next();
    });
});
// const jwt = require('jsonwebtoken');
// import express from 'express';
// const secretKey = require('./auth');
// interface AuthenticatedRequest extends express.Request {
//   user?: {
//     username: string;
//     password: string;
//   };
// }
// module.exports = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
//   const authHeader = req.header('Authorization');
//   if (!authHeader) {
//     return res.redirect(307, 'http://localhost:3000/login?redirectUrl=localhost:4723/device-farm');
//     // Redirect to login / register page with the redirectUrl query parameter
//   }
//   jwt.verify(authHeader, 'testjsonsecretkey', (err: any, user: any) => {
//     if (err) {
//       return res.redirect(
//         307,
//         'http://localhost:3000/login?redirectUrl=localhost:4723/device-farm'
//       );
//       // Redirect to login/signup page with the redirectUrl query parameter
//     }
//     req.user = user;
//     next();
//   });
// };
