
import './App.css';
import InputForm from './Components/InputForm';
import Navbar from './Components/Navbar';
import { Routes, Route,  } from 'react-router-dom';
import FilteredProducts from './Components/FilteredProducts';
import EditProductForm from './Components/EditProductForm';



function App() {
  return (
    <>
    <div>
      <Navbar/>
      <Routes>
       
        <Route path="/products/:category" element={<FilteredProducts/>} />
        <Route path="/products/edit/:id" component={<EditProductForm/>} />

      </Routes>
      <InputForm />
      </div>
    </>
  );
}

export default App;
