import React from 'react';
import { Link } from 'react-router-dom';
import "./index.css";

const Navbar = () => {
  return (
    <div className='choices'>
      <Link to="/products/Decor">Decor</Link>
      <Link to="/products/Kitchen">Kitchen</Link>
      <Link to="/products/Furniture">Furniture</Link>
      <Link to="/input">InputForm</Link>
    </div>
  );
};

export default Navbar;
