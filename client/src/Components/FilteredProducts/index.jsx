import React, { useContext } from "react";
import { MyContext } from "../../Context";
import "./index.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const FilteredProducts = ({ productData}) => {
 
  const { productArray, setProductArray, handleEditSuccess } = useContext(MyContext);
  const { category } = useParams(); // Use useParams to get the 'category' parameter


  const [editedData, setEditedData] = useState(productData);




  const [type, setType] = useState(productArray.type);
  const [title, setTitle] = useState(productArray.title);
  const [description, setDescription] = useState(productArray.description);
  const [image, setImage] = useState(productArray.type);
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


  const handleEdit = () => {
    // Send a PUT request to update the product on the server
    axios
      .put(`/server/products/${productData._id}`, editedData)
      .then((response) => {
        // Handle the response, maybe check if it was successful
        handleEditSuccess (response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>{`Show ${category} Products`}</h1>

      {filteredProducts.map((item) => (
        <div className="item_card" key={item._id}>
          <div className="item_sub_card">
            <p>{item.type}</p>
            <p>{item.title}</p>
            <p>{item.description}</p>
            <p>${item.price}</p>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
            <button onClick={() => handleEdit(item._id)}>Edit</button>
            <p>{item.isAvailable ? "Available" : "Not Available"}</p>
          </div>
          <img className="image" src={item.image} alt={item.image} />
        </div>
      ))}
    </div>
  );
};

export default FilteredProducts;
