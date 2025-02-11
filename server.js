require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

const Product = require("./modals/productModal")


// Fetch products
app.get("/api/products", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Define a simple route to get product details by productId
app.get("/api/products/:productId", async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findOne({ id: productId });  // Find product by productId
        if (product) {
            console.error("product", product);
            res.status(200).json(product);  // Send product data as response
        } else {
            res.status(404).json({ message: "Product not found" });  // Product not found
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Server error" });
    }
});

async function insert() {
    await Product.create({ id: "1", name: "Laptop", price: 999, description: "High-performance laptop" },
        { id: "2", name: "Smartphone", price: 599, description: "Latest smartphone with AI camera" },
        { id: "3", name: "Headphones", price: 199, description: "Noise-canceling headphones" })
}

insert();

// Add product
app.post("/api/products", async (req, res) => {
    const { name, price, description } = req.body;
    const newProduct = new Product({ name, price, description });
    await newProduct.save();
    res.json(newProduct);
});

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.listen(PORT, () => {
    const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
    console.log(`Server running at ${BASE_URL}`);
});
