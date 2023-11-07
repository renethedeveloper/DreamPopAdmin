import React, { useState } from 'react';
import axios from 'axios';

const Login = ({setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: 'post',
        url: '/server/login', // Adjust the URL to your server's sign-in endpoint
        data: { email, password },
      });

      localStorage.setItem("user_token", response.data.token)
      console.log("Token is in Storage!")
      setMessage( 'Login successful!');
      console.log(response.data)
      
      // Store authentication token or user info in local storage or session storage to keep the user authenticated.
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Error during sign-in');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
