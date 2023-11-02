// EditProductForm.js
import React, { useState } from "react";
import axios from "axios";
import { MyContext } from "../../Context";
import { useParams } from "react-router-dom";



const EditProductForm = ({ productData, onEditSuccess }) => {



  const { productArray, setProductArray, handleEditSuccess } = useContext(MyContext);
  const [editedData, setEditedData] = useState(productData);


  const [type, setType] = useContext(productArray.type);
  const [title, setTitle] = useContext(productArray.title);
  const [description, setDescription] = useContext(productArray.description);
  const [image, setImage] = useContext(productArray.type);
  const [price, setPrice] = useContext(productArray.price);
  const [isAvailable, setIsAvailable] = useContext(false);


  const handleSubmitEdit = (e) => {
    e.preventDefault()
    // Send a PUT request to update the product on the server
    axios
      .put(`/server/products/${editedData._id}`, editedData)
      .then((response) => {
        // Handle the response, maybe check if it was successful
        handleEditSuccess (response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };




  const handleEdit = (e) => {
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
       <form  onSubmit={handleSubmitEdit}>
               Type: <input type="text" name="type" value={editedData.type || ''} onChange={(e) => setProductData({ ...editedData, type: e.target.value })} />
                <br />
                Title: <input type="text" name="title" value={editedData.title} onChange={(e) => setProductData({ ...editedData, title: e.target.value })} />
                <br />
                Image: <input type="text" name="image" value={editedData.image} onChange={(e) => setProductData({ ...editedData, image: e.target.value })} />
                <br />
                Price: <input type="number" name="price" value={editedData.price} onChange={(e) => setProductData({ ...editedData, price: +e.target.value })} />
                <br />
                Is Available: <input type="checkbox" name="isAvailable" checked={editedData.isAvailable} onChange={(e) => setProductData({ ...editedData, isAvailable: e.target.checked })} />
                <br />
                Description: <textarea className='description' type="text" name="description" value={editedData.description} onChange={(e) => setProductData({ ...editedData, description: e.target.value })} />
                <br />
                <button onSubmit={handleEdit}>Submit Changes</button>
            </form>
      
    </div>
  );
};

export default EditProductForm;
