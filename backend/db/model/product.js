const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    qty: String,
    size: String,
    category: String,
    brand: String,
    userId: String,
});

const Product = mongoose.model('products',productSchema);

module.exports = {Product};