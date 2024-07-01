// productModel.js

const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    B_id : ObjectId,
    S_id : ObjectId,
    P_name: String,
    GST: Number,
    P_stock: Number,
    P_price: Number,
    Added_date: Date
});

const ProductModel = mongoose.model('Products', productSchema, 'Products');

module.exports = ProductModel;
