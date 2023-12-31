import React, { useState, useContext } from "react";
import axios from "axios";
import { MyContext } from "../../Context";
import { Navigate, useParams } from "react-router-dom";
import FilteredProducts from "../FilteredProducts";
import { useNavigate } from "react-router-dom";
import InputForm from "../InputForm";

const EditProductForm = () => {
  const navigate =useNavigate();
  const { id } = useParams();
  const { handleEditSuccess, productArray } = useContext(MyContext);

  // Find the product based on its ID
  const productToEdit = productArray.find((item) => item._id === id);

  const [editedData, setEditedData] = useState({
    ...productToEdit, // Initialize with the existing product data
  });

  const handleFieldChange = (field, value) => {
    // Update only the specified field
    setEditedData({ ...editedData, [field]: value });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();

    // Send a PUT request to update the product with editedData
    axios
      .put(`/server/products/${editedData._id}`, editedData)
      .then((response) => {
        console.log("TESTING");
        // Handle the response, maybe check if it was successful
        handleEditSuccess(response.data);
        navigate(-1)
      })
      .catch((error) => {
        console.error(error, "This is not working");
      });
     
      
  };

  return (
    <div>
      <h1>Editing</h1>

      <form onSubmit={handleSubmitEdit}>
        Type:{" "}
        <input
          type="text"
          name="type"
          value={editedData.type}
          onChange={(e) => handleFieldChange("type", e.target.value)}
        />
        <br />
        Title:{" "}
        <input
          type="text"
          name="title"
          value={editedData.title}
          onChange={(e) => handleFieldChange("title", e.target.value)}
        />
        <br />
        Price:{" "}
        <input
          type="number"
          name="price"
          value={editedData.price}
          onChange={(e) => handleFieldChange("price", +e.target.value)}
        />
        <br />
        Description:{" "}
        <input
          type="text"
          name="description"
          value={editedData.description}
          onChange={(e) => handleFieldChange("description", e.target.value)}
        />
        <br />
        Images (separated by commas):{" "}
        <input
          type="text"
          name="images"
          value={editedData.images?.join(',')}
          onChange={(e) => handleFieldChange("images", e.target.value.split(','))}
        />
        <br />
        <input
  type="radio"
  name="available"
  value="true"  // or some other value that represents "true"
  onChange={(e) => handleFieldChange("isAvailable", e.target.value)}
/>
<span>Available</span>

<input
  type="radio"
  name="available"
  value="false"  // or some other value that represents "false"
  onChange={(e) => handleFieldChange("isAvailable", e.target.value)}
/>
<span>Not Available</span>

       
        <button type="submit">Submit Changes</button>
      </form>
      
    </div>
  );
};

export default EditProductForm;
