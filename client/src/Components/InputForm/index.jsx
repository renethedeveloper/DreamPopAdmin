import { useState } from 'react';
import axios from 'axios';
import "./index.css";

const InputForm = () => {
    const initialProductData = {
        type: "",
        title: "",
        description: "",
        images: [], 
        price: null,
        isAvailable: false
    };

    const [productData, setProductData] = useState(initialProductData);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(productData);
        console.log("Testing before Axios call");
        axios({
            method: "POST",
            url: "/server/products",
            data: productData
        }).then((res) => {
            console.log(res);
            console.log("we got this far.");
            // Reset the form fields by setting the state to its initial values
            setProductData(initialProductData);
            e.target.value = ""
        });
    }
    const handleImageChange = (e, index) => {
        setProductData((prevData) => {
            // Create a new array with updated image URL at the specified index
            const updatedImages = [...prevData.images];
            updatedImages[index] = e.target.value;
    
            // Return the new state
            return { ...prevData, images: updatedImages };
        });
    };
    
    

    const addImageInput = () => {
        setProductData((prevData) => {
            // Add an empty string to the images array when a new image input is added
            return { ...prevData, images: [...prevData.images, ""] };
        });
    };
    


    return (
        <form className='inputForm' onSubmit={handleSubmit}>
            <div className='form-group'>
                <label>Type:</label>
                <div>
                    <input type="radio" name="type" value="Kitchen" checked={productData.type === "Kitchen"} onChange={(e) => setProductData({ ...productData, type: e.target.value })} /> Kitchen
                    <input type="radio" name="type" value="Decor" checked={productData.type === "Decor"} onChange={(e) => setProductData({ ...productData, type: e.target.value })} /> Decor
                    <input type="radio" name="type" value="Furniture" checked={productData.type === "Furniture"} onChange={(e) => setProductData({ ...productData, type: e.target.value })} /> Furniture
                    <input type="radio" name="type" value="Lighting" checked={productData.type === "Lighting"} onChange={(e) => setProductData({ ...productData, type: e.target.value })} /> Lighting
                </div>
            </div>

            <div className='form-group'>
                <label>Title:</label>
                <input type="text" name="title" value={productData.title} onChange={(e) => setProductData({ ...productData, title: e.target.value })} />
            </div>

            <div className='form-group'>
                <label>Images:</label>
                {productData.images.map((image, index) => (
                    <input
                        key={index}
                        type="text"
                        name={`image-${index}`}
                        value={image}
                        onChange={(e) => handleImageChange(e, index)}
                    />
                ))}
                <button type="button" onClick={addImageInput}>
                    Add Image
                </button>
            </div>

            <div className='form-group'>
                <label>Price:</label>
                <input type="number" name="price" value={productData.price} onChange={(e) => setProductData({ ...productData, price: +e.target.value })} />
            </div>

            <div className='form-group'>
                <label>Is Available:</label>
                <input type="checkbox" name="isAvailable" checked={productData.isAvailable} onChange={(e) => setProductData({ ...productData, isAvailable: e.target.checked })} />
            </div>

            <div className='form-group'>
                <label>Description:</label>
                <textarea className='description' type="text" name="description" value={productData.description} onChange={(e) => setProductData({ ...productData, description: e.target.value })} />
            </div>

            <button>Add Inventory</button>
        </form>
    );
}

export default InputForm;
