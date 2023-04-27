import React from 'react';
import RegisterForm from '../components/RegisterForm'

function RegisterPage() {
  const handleRegister = async (username:string, password: string) => {
    // Make a POST request to the registration endpoint with the user's name, email, and password
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      // Handle the response
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
}

export default RegisterPage;
