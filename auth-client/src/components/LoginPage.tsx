import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import Dashboard from '../components/Dashboard';
import '../components/Loginform.css';
import axios from 'axios';
import './Loginform.css';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
      } else {
        history('/dashboard');
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong. Please try again later.');
    }
  };
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });
      console.log(response.data); // do something with the response
    } catch (error) {
      console.error(error);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div>
      {/* {error && <div>{error}</div>} */}

      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <h3> Login </h3>
            <form className="login">
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  className="login__input"
                  placeholder="Username"
                  // id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                ></input>
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>

                <input
                  type="password"
                  placeholder="Password"
                  className="login__input"
                  // id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                ></input>
              </div>
              <button className="button login__submit">
                <a
                  href="http://localhost:4723/device-farm/"
                  style={{ textDecoration: 'none' }}
                  className="button__text"
                >
                  Log In{' '}
                </a>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
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
    </div>
  );
};
