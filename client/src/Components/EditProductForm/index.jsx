import React, { useState, useContext } from "react";
import axios from "axios";
import { MyContext } from "../../Context";
import { useParams } from "react-router-dom";
import FilteredProducts from "../FilteredProducts";

const EditProductForm = () => {

  

  

  const {id}= useParams();

  const { handleEditSuccess,productArray  } = useContext(MyContext);

//just an experiment
const filteredProducts = productArray.filter((item) => item._id === id);
//experiment



const [editedData, setEditedData] = useState({
  _id: id, 
  type: "",
  title: "",
  image: "",
  price: 0,
  isAvailable: false,
  description: "",
});
  
  

  const handleSubmitEdit = (e) => {
    e.preventDefault(); 
    // Send a PUT request to update the product on the server
   
   
   
    axios({
      method: "put",
      url: `/server/products/${editedData._id}`,//the problems is here
      data: editedData, // Include the data
    })
      .then((response) => {
        console.log("TESTING");
        // Handle the response, maybe check if it was successful
        handleEditSuccess(response.data);
      })
      .catch((error) => {
        console.error(error, "This is not working");
      });
  };

  return (
    <div>
      <h1>Editing</h1>
     
      <form onSubmit={handleSubmitEdit}>
        Type:{""}
        <input
          type="text"
          name="type"
          value={editedData.type || ""}
          onChange={(e) => setEditedData({ ...editedData, type: e.target.value })}
        />
        <br />
        Title:{" "}
        <input
          type="text"
          name="title"
          value={editedData.title}
          onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
        />
        <br />
        Image:{" "}
        <input
          type="text"
          name="image"
          value={editedData.image}
          onChange={(e) => setEditedData({ ...editedData, image: e.target.value })}
        />
        <br />
        Price:{" "}
        <input
          type="number"
          name="price"
          value={editedData.price}
          onChange={(e) => setEditedData({ ...editedData, price: +e.target.value })}
        />
        <br />
        Is Available:{" "}
        <input
          type="checkbox"
          name="isAvailable"
          checked={editedData.isAvailable}
          onChange={(e) => setEditedData({ ...editedData, isAvailable: e.target.checked })}
        />
        <br />
        Description:{" "}
        <textarea
          className="description"
          type="text"
          name="description"
          value={editedData.description}
          onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
        />
        <br />
        <button type="submit">Submit Changes</button>
      </form>
      {filteredProducts.map((item) => (
          <div className="item_card" key={item._id}>
            <div className="item_sub_card">
              <p>{item.type}</p>
              <p>{item.title}</p>
              <p>{item.description}</p>
              <p>${item.price}</p>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
              <button onClick={() => navigateToDestination(item._id)}>Edit</button>
              <p>{item.isAvailable ? "Available" : "Not Available"}</p>
              <div>
            
              </div>
            </div>
            <img className="image" src={item.image} alt={item.image} />
          </div>
        ))}
   

    </div>
  );
};

export default EditProductForm;
