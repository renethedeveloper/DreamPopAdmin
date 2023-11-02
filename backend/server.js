const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const Product = require("./models/Product");
require('dotenv').config();
require("./config");

const PORT = 3000;

const app = express();

// Middleware
app.use(express.static('public')); 
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use(morgan("dev"));
app.use(helmet());

// Routes

app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});

app.post("/products", async (req, res) => {
    try {
        const newProduct = req.body;
        if (!newProduct.title || !newProduct.description || !newProduct.price) {
            res.status(400).send("Bad Request: Product name and price are required.");
        } else {
            const product = await Product.create(newProduct);
            console.log(`Created product: ${product}`);
            res.status(201).send(product);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error: Failed to create the product.");
    }
});

app.get("/products", async (req, res) => {
    try {
        const productArray = await Product.find();
        res.json(productArray);
        console.log(productArray)
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("An error occurred while fetching products");
    }
});

app.get("/products/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).send("Product not found");
        } else {
            res.json(product);
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send("An error occurred while fetching the product");
    }
});


app.delete("/products/:id", async (req, res) => {
    const productId = req.params.id;

    try {
        let deletedItem = await Product.findByIdAndDelete(productId);
        if (!deletedItem) {
            return res.status(404).send('No item with that ID');
        }
        // If the item was deleted successfully, you can return a success message here
        res.json("Item deleted!");
    } catch (error) {
        console.log("Error Deleting.", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});









// The code should continue running your server without the MongoDB connection part here.

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
