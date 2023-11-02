// EditProductForm.js
import React, { useState } from "react";
import axios from "axios";

const EditProductForm = ({ productData, onEditSuccess }) => {

  const [editedData, setEditedData] = useState(productData);


  const [type, setType] = useContext(productArray.type);
  const [title, setTitle] = useContext(productArray.title);
  const [description, setDescription] = useContext(productArray.description);
  const [image, setImage] = useContext(productArray.type);
  const [price, setPrice] = useContext(productArray.price);
  const [isAvailable, setIsAvailable] = useContext(false);

  const handleEdit = () => {
    // Send a PUT request to update the product on the server
    axios
      .put(`/server/products/${productData._id}`, editedData)
      .then((response) => {
        // Handle the response, maybe check if it was successful
        onEditSuccess(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {/* Input fields for editing (e.g., type, title, description, etc.) */}
      <button onClick={handleEdit}>Save Changes</button>
    </div>
  );
};

export default EditProductForm;
