// productModel.js

const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    C_name: String,
    P_name: String, // Assuming this is an array of product names
    P_price: Number, // Total price
    Quantity: Number // Total quantity
});

const InvoiceModel = mongoose.model('Invoice', invoiceSchema, 'Invoice');

module.exports = InvoiceModel;
