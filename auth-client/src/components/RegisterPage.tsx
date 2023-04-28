import React from 'react';
import './Navigation.css';
import { useNavigate } from 'react-router-dom';
import './Register.css';

interface RegisterFormProps {
  onSubmit: (username: string, password: string) => Promise<void>;
}

const RegisterPage: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Make a POST request to the registration endpoint with the user's name, email, and password
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      // Handle the response
      const data = await response.json();
      console.log(data);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <h3> Register </h3>
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
                  href="/login"
                  style={{ textDecoration: 'none' }}
                  className="button__text"
                >
                  Register{' '}
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

export default RegisterPage;
