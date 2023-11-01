
import './App.css';
import InputForm from './Components/InputForm';
import Navbar from './Components/Navbar';
import { Routes, Route,  } from 'react-router-dom';
import FilteredProducts from './Components/FilteredProducts';



function App() {
  return (
    <>
    <div>
      <Navbar/>
      <Routes>
       
        <Route path="/products/:category" element={<FilteredProducts/>} />
      </Routes>
      <InputForm />
      </div>
    </>
  );
}

export default App;
