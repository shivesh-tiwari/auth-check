import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import '../components/style.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4723/auth/login', {
        username,
        password,
      });
      if (response.status >= 200 && response.status < 300) {
        response.data.username = username;
        console.log(response.data);
        // Redirect back to the original URL
        const urlParams = new URLSearchParams(window.location.search);
        console.log('DING DING DING1');
        const redirectUrl = urlParams.get('redirectUrl');
        if (redirectUrl) {
          const redirectUrlWithState = new URL(redirectUrl);
          console.log('DING DING DING2');
          redirectUrlWithState.searchParams.append('state', JSON.stringify(response.data));
          window.location.href = redirectUrlWithState.href;
          console.log('Token URL: ', window.location.href);
        } else {
          navigate('/'); // Redirect to a default route if no redirect URL is specified
        }
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={handleFormSubmit}>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className="login__input"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              ></input>
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              ></input>
            </div>
            <button className="button login__submit" type="submit">
              <span className="button__text">Login</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
            {error && <div>{error}</div>}
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../App.css';
// import '../components/style.css';

// const LoginPage: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const history = useNavigate();

//   const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/auth/login', {
//         username,
//         password,
//       });
//       // do something with the response
//       if (response.status >= 200 && response.status < 300) {
//         // history("/dashboard");
//         console.log('Hello this is response data');
//         //console.log(response.data.token);
//         response.data.username = username;
//         console.log(response.data);

//         return response.data;
//         //window.location.href = 'http://localhost:4723/device-farm';
//       } else {
//         setError('Invalid username or password');
//       }
//     } catch (error) {
//       console.error(error);
//       setError('Something went wrong. Please try again later.');
//     }
//   };
