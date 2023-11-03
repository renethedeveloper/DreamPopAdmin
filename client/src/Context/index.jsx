import  { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a new context
export const MyContext = createContext();

const ContextProvider = ({ children }) => {
  // Define your state and functions here
  const [productArray, setProductArray] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [updatedProductArray, setUpDatedProductArray] = useState(productArray)





// Function to handle edit success
const handleEditSuccess = (editedProduct) => {
  // Update the productArray state with the edited product data
  const updatedProductArray = productArray.map((product) =>
    product._id === editedProduct._id ? editedProduct : product
  );
  setProductArray(updatedProductArray);
};





  useEffect(() => {
    console.log("the code works up until this point")
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "/server/products", 
      };
   

      try {
        const response = await axios(options);
        console.log(response.data, "We got the goods!");
        setProductArray(response.data);
        localStorage.setItem("products", JSON.stringify(response.data));
      } catch (error) {
        console.error(error);
        console.log("There was an error selecting the image.");
       
      }
    };

    // Check if there is data in localStorage and set productsArray
    // let productsData = localStorage.getItem("products");
    // productsData = JSON.parse(productsData);
    // if (productsData) {
      // setProductArray(productsData);
    // } else {
      fetchData(); // If data is not available in localStorage, fetch it.
    // }
  }, []); // Make sure you have imported useEffect from 'react'.

  const contextValue = {
    // Your context data and functions go here
    productArray,
    setProductArray,
    handleEditSuccess,
    updatedProductArray,
    setUpDatedProductArray,
    selectedImage,
    setSelectedImage,
  };

  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};

export default ContextProvider;
