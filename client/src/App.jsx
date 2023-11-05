import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import FilteredProducts from './Components/FilteredProducts';
import EditProductForm from './Components/EditProductForm';
import Navbar from './Components/Navbar';
import InputForm from './Components/InputForm';
import "./App.css"
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import axios from 'axios';



function App() {

  const [user, setUser] = useState(null)


useEffect(()=>{
  let token = localStorage.getItem("user_token")
  if(token){
    //here the token has to be taken to the server and verified. 
    axios({
      method:"GET",
      url:"/check_token",
      header:{
        authorization: token
      }
    }).then((res)=>{
      console.log(res)
    })
  }
},[])


  return (
    <div>
    
     
       <Login setUser={setUser}/>
       {user?<div> <Navbar />   </div>: <></>}
     
    
    
    
      <Routes>
        <Route path="/products/:category" element={<FilteredProducts />} />
        <Route path="/products/edit/:id"  element={<EditProductForm />} />
        <Route path="/input" element={<InputForm />} />
      {/* <Route path="/login" element={<Login />} />   */}
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
