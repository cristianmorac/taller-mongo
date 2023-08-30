const mongoose = require('mongoose')

// Schema
const productsSchema = new mongoose.Schema({
    name:String,
    description:String,
})

// model
const Product = mongoose.model('Product', productsSchema);

module.exports = Product