import React, { useState } from "react";
import axios from "axios";

interface LoginFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleSubmit,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  const [error, setError] = useState("");

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });
      console.log(response.data); // do something with the response
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit || handleFormSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default LoginForm;
