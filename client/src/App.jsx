import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FilteredProducts from './Components/FilteredProducts';
import EditProductForm from './Components/EditProductForm';
import Navbar from './Components/Navbar';
import InputForm from './Components/InputForm';
import "./App.css"

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/products/:category" element={<FilteredProducts />} />
        <Route path="/products/edit/:id"  element={<EditProductForm />} />
        <Route path="/input" element={<InputForm />} />
      </Routes>
    </div>
  );
}

export default App;
