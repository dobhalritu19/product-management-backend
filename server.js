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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
