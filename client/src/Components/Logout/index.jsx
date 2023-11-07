import React, { useContext } from 'react';
import { MyContext } from '../../Context';

const Logout = () => {
  const { setToken } = useContext(MyContext);

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    setToken(null);
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
