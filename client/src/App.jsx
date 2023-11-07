import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import FilteredProducts from './Components/FilteredProducts';
import EditProductForm from './Components/EditProductForm';
import Navbar from './Components/Navbar';
import InputForm from './Components/InputForm';
import "./App.css"
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import axios from 'axios';
import { MyContext } from './Context';
import Logout from './Components/Logout';



function App() {

  const [user, setUser] = useState(null)
  const {token , setToken} = useContext(MyContext)

useEffect(()=>{
  let token = localStorage.getItem("user_token")
  if(token){
    //here the token has to be taken to the server and verified. 
    try {
      axios({
        method:"GET",
        url:"/server/check_token",
        headers:{
          Authorization: token
        }
      }).then((res)=>{
        console.log(res)
        setToken(token)
      })

    } catch(err) {
      // error hrere
    }
  }
},[])


  return (
    <div>
    
     { !token ?  <Login setUser={setUser}/> :
       <>
        <Navbar />  
            <Routes>
            <Route path="/products/:category" element={<FilteredProducts />} />
            <Route path="/products/edit/:id"  element={<EditProductForm />} />
            <Route path="/input" element={<InputForm />} />
            <Route path="/logout" element={<Logout />} />
            {/* <Route path="/signup" element={<SignUp />} /> */}
          </Routes>


       </>
      
    
    }
      
      
     
    
    
    

    </div>
  );
}

export default App;
