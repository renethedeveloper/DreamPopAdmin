  import React, { useContext } from "react";
  import { MyContext } from "../../Context";
  import "./index.css";
  import {useParams, useNavigate } from "react-router-dom";
  import axios from "axios";
  import { useState } from "react";



  const FilteredProducts = () => {
    

  
    const { productArray, setProductArray, } = useContext(MyContext);


    const { category } = useParams(); // Use useParams to get the 'category' parameter


    
  




    const [type, setType] = useState(productArray.type);
    const [title, setTitle] = useState(productArray.title);
    const [description, setDescription] = useState(productArray.description);
    const [images, setImages] = useState(productArray.type);
    const [price, setPrice] = useState(productArray.price);
    const [isAvailable, setIsAvailable] = useState(false);


    console.log(`Rendering ${category} products`);

    // Filter products based on the category
    const filteredProducts = productArray.filter((item) => item.type === category);
  

    const handleDelete = (id) => {
      console.log("the button works");
      axios({
        method: "DELETE",
        url: `/server/products/${id}`,
      })
        .then((response) => {
          console.log(response.data);
          // Update the state with the new array after successful deletion
          setProductArray((prevProductArray) =>
            prevProductArray.filter((item) => item._id !== id)
          );
          // Remove the item from local storage
          // localStorage.removeItem(id);
          // Alert the user that the product has been deleted
          alert("Product Deleted");
        })
        .catch((error) => {
          console.error(error);
        });
    };



    

    
    let navigate =useNavigate();
      const navigateToDestination = (id) => {
        
        navigate(`/products/edit/${id}`)
      };
      
    

  
      return (
        <div>
          <h1 className="h1">{`${category}`}</h1>
    
          {filteredProducts.map((item) => (
            <div className="item_card" key={item._id}>
              <div className="item_sub_card">
                {item.isAvailable || (
                  <div className="sold-bar">
                    <p>SOLD</p>
                  </div>
                )}
                <h2 className="itemTitle">{`"${item.title}"`}</h2>
                <p className="description">{item.description}</p>
                <p className="price">Price ${item.price}</p>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
                <button onClick={() => navigateToDestination(item._id)}>Edit</button>
                <p>{item.isAvailable ? "Available" : "Not Available"}</p>
              </div>
              <img className="image" src={item.images[0]} alt={item.image} />
            </div>
          ))}
        </div>
      );
    };
    
    export default FilteredProducts;
