import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const history = useNavigate();
  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4723/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        history('/login');
      } else {
        setError('Error while registering, Pls try again');
        history('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="register" onSubmit={handleRegister}>
            <div className="register__field">
              <i className="register__icon fas fa-user"></i>
              <input
                type="text"
                className="register__input"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              ></input>
            </div>
            <div className="register__field">
              <i className="register__icon fas fa-lock"></i>
              <input
                type="email"
                className="register__input"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </div>
            <div className="register__field">
              <i className="register__icon fas fa-lock"></i>
              <input
                type="password"
                className="register__input"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              ></input>
            </div>
            <button className="button register__submit" type="submit">
              <span className="button__text">register</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
            {error && <div>{error}</div>}
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape7"></span>
          <span className="screen__background__shape screen__background__shape6"></span>
          <span className="screen__background__shape screen__background__shape5"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
    //   <div className="container">
    //     <form onSubmit={handleRegister}>
    //       <div>
    //         <label htmlFor="username">Username</label>
    //         <input
    //           type="text"
    //           id="username"
    //           value={username}
    //           onChange={(event) => setUsername(event.target.value)}
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="password">Password</label>
    //         <input
    //           type="password"
    //           id="password"
    //           value={password}
    //           onChange={(event) => setPassword(event.target.value)}
    //         />
    //       </div>
    //       <Link to="/login">
    //         <button className="mt-2 rounded " type="submit">
    //           Register
    //         </button>
    //       </Link>
    //     </form>
    //     {error && <div>{error}</div>}
    //   </div>
  );
};

export default RegisterPage;
