const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const Product = require("./models/Product");
require("dotenv").config();
require("./config");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const Event = require('./models/Events');




const PORT = 3001;

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(helmet());
app.use((req, res, next)=> {
  if (req.path.startsWith('/server')) {
      req.url = req.url.replace('/server', ''); // strip /server from the path
  }
  next();
});
// const authMiddleware = require("./authMiddleware")



// Routes




// app.post('/admin-action', authMiddleware.checkAdminRole, (req, res) => {
//   // This code will only execute if the user has the 'admin' role
//   res.json({ message: 'Admin action performed.' });
// });





app.get("/check_token", async (req, res) => {
  const token = req.header("Authorization");
  console.log(token);
  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  } 

  jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({
          auth: false,
          statusCode: 500,
          message: "Failed to validate token.",
        });
    } else {

      res.status(200).send({ auth: true });
    }
  });
});

app.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    console.log("sign up went smoothly");

    res.json(user);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Error during signup" });
  }
});

app.post("/login", async (req, res) => {
  const { secretKey } = req.body;
  

  try {
    // const user = await User.findOne({ email }); //or use findOne?

    // if (!user) {
    //   return res.status(401).json({ error: "User not found." });
    // }

    const isPasswordValid = secretKey === process.env.TOKEN_SECRET

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Wrong Password" });
    }

    // If both the email and password are correct, you can return a token for authentication
    const token = jwt.sign({ isAdmin:true }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
    // delete user.password;
    // You should use a library like JSON Web Tokens (JWT) for this purpose.
    res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    console.error("Error during login..", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/products", async (req, res) => {
  try {
    // Validation for new product here
    const newProduct = req.body;
    if (!newProduct.title || !newProduct.description || !newProduct.price) {
      return res
        .status(400)
        .json({
          error:
            "Bad Request: Product name, description, and price are required.",
        });
    }
    const product = await Product.create(newProduct);
    console.log(`Created product: ${product}`);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error: Failed to create the product." });
  }
});


app.post("/events", async (req, res) => {
  try {
    
    const newEvent = req.body;
    if (!newEvent.title || !newEvent.description) {
      return res
        .status(400)
        .json({
          error:
            "Bad Request: Incomplete",
        });
    }
    const event = await Event.create(newEvent);
    console.log(`Created Event: ${Event.title}`);
    res.status(201).json({ event, message: "Event Created!" });
    
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error: Failed to create the event." });
  }
});






app.get("/products", async (req, res) => {
  try {
    const productArray = await Product.find();
    res.json(productArray);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
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
    res
      .status(500)
      .json({ error: "An error occurred while fetching the product" });
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
      return res
        .status(400)
        .json({ error: "Bad Request: 'type' and 'title' are required." });
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedInfo, {
      new: true,
    });
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
