import React, { useContext, useState } from 'react';
import axios from 'axios';
import { MyContext } from '../../Context';

const Login = ({ setUser }) => {
  const { setToken } = useContext(MyContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [userType, setUserType] = useState('');

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
        url: 'http://localhost:3001/login', 
        data: { secretKey }
      });
      localStorage.removeItem('user_token');
      localStorage.setItem('user_token', response.data.token);
      console.log('Token is in Storage!');
      setMessage('Login successful!');
      console.log(response.data);
      setToken(response.data.token);

      // Store authentication token or user info in local storage or session storage to keep the user authenticated.
    } catch (error) {
      console.error("Error during login:", error); 
      setMessage(error?.response?.data?.message || 'Error during sign-in!!!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Secret Key</label>
          <input
            type="text"
            placeholder="Secret!"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
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
