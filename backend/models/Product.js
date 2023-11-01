
const mongoose = require('mongoose');

// create schema (breakdown of what our data should look like)
const productSchema = new mongoose.Schema(
    {
        type: String,
        title: String,
        description: String,
        image: String,
        price: Number,
        isAvailable: Boolean,

        
    },
    {
        timestamps: true
    }
);

// create Model with that schema
// whatever we put as the collection name will be lowercased and pluralized +s
// Veggies > veggies
const Product = mongoose.model("Product", productSchema);

module.exports = Product;

