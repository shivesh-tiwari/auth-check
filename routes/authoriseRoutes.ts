const jwt = require('jsonwebtoken');
import express from 'express';
const secretKey = require('./auth');
interface AuthenticatedRequest extends express.Request {
  user?: {
    username: string;
    password: string;
  };
}
module.exports = async (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log('auth header-1: ', req.header('Authorization'));
  let authHeader = req.header('Authorization');
  if (!authHeader) {
    const redirectUrl = req.query.redirectUrl as string;
    console.log('req.query.redirectUrl : ', req.query.redirectUrl);
    if (redirectUrl) {
      const state = await JSON.parse(req.query.state as string);
      console.log('response.data(state) : ', state);
      if (state && state.token) {
        authHeader = `${state.token}`;
      }
    }
    console.log('auth-header-2', authHeader);
    if (!authHeader) {
      return res.redirect(
        307,
        'http://localhost:3000/login?redirectUrl=http://localhost:4723/device-farm'
      );
      // Redirect to login / register page with the redirectUrl query parameter
    }
  }
  console.log('auth-header-3 ', authHeader);
  const jwt_token_extracted = authHeader.replace('Bearer ', '');
  jwt.verify(jwt_token_extracted, 'testjsonsecretkey', (err: any, user: any) => {
    if (err) {
      return res.redirect(
        307,
        'http://localhost:3000/login?redirectUrl=http://localhost:4723/device-farm'
      );
      // Redirect to login/signup page with the redirectUrl query parameter
    }
    req.user = user;
    next();
  });
};

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
