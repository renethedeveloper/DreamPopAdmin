import React, { useContext } from "react";
import { MyContext } from "../../Context";
import "./index.css";
import { useParams } from "react-router-dom";

const FilteredProducts = () => {
  const { productArray, setProductArray } = useContext(MyContext);
  const { category } = useParams(); // Use useParams to get the 'category' parameter

  console.log(`Rendering ${category} products`);

  // Filter products based on the category
  const filteredProducts = productArray.filter((item) => item.type === category);



  const handleDelete = (id) => {
    // Filter the array to remove the item with the matching id
    let newArray = productArray.filter((item) => item._id !== id);
  
    // Update the state with the new array
    setProductArray(newArray);
  
    // Alert the user that the product has been deleted
    alert("Product Deleted");
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
            <button on onClick={()=>{handleDelete}}>Delete</button>
            <p>{item.isAvailable ? "Available" : "Not Available"}</p>
          </div>
          <img className="image" src={item.image} alt={item.image} />
        </div>
      ))}
    </div>
  );
};

export default FilteredProducts;
