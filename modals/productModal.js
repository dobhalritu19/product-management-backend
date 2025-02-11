
const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: Number,
    description: String,
});

module.exports = mongoose.model("Product", ProductSchema);
