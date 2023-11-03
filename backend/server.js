const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const Product = require("./models/Product");
require("dotenv").config();
require("./config");

const PORT = 3000;

const app = express();

// Middleware
app.use(express.static("public"));
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
        // Validation for new product here
        const newProduct = req.body;
        if (!newProduct.title || !newProduct.description || !newProduct.price) {
            return res.status(400).json({ error: "Bad Request: Product name, description, and price are required." });
        }
        const product = await Product.create(newProduct);
        console.log(`Created product: ${product}`);
        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error: Failed to create the product." });
    }
});

app.get("/products", async (req, res) => {
    try {
        const productArray = await Product.find();
        res.json(productArray);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "An error occurred while fetching products" });
    }
});

app.get("/products/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "An error occurred while fetching the product" });
    }
});

app.delete("/products/:id", async (req, res) => {
    const productId = req.params.id;
    try {
        let deletedItem = await Product.findByIdAndDelete(productId);
        if (!deletedItem) {
            return res.status(404).json({ error: "No item with that ID" });
        }
        res.json("Item deleted!");
    } catch (error) {
        console.error("Error Deleting.", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/products/:id", async (req, res) => {
    const updatedInfo = req.body;
    const id = req.params.id;
    try {
        // Add validation for other fields if necessary
        if (!updatedInfo.type || !updatedInfo.title) {
            return res.status(400).json({ error: "Bad Request: 'type' and 'title' are required." });
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, updatedInfo, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(updatedProduct);
    } catch (err) {
        console.log("Error Updating Item", err);
        res.status(500).json({ error: "Server Error" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
