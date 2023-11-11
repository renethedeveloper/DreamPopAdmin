import React from 'react';
import { Link } from 'react-router-dom';
import "./index.css";

const Navbar = () => {
  return (
    <div className='navBar'>
      <Link className='link' to="/products/Decor">Decor</Link>
      <Link className='link'to="/products/Kitchen">Kitchen</Link>
      <Link className='link'to="/products/Furniture">Furniture</Link>
      <Link className='link'to="/products/Lighting">Lighting</Link>
      <Link className='link'to="/input">InputForm</Link>
      {/* <Link to="/login ">Login</Link> */}
      <Link className='link'to="/logout ">Logout</Link>
    {/* <Link to="/signup ">Sign Up</Link>   */}
    </div>
  );
};

export default Navbar;
