const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    Brand_name: String
})

const BrandModel = mongoose.model('Brand',brandSchema,'Brand')
module.exports = BrandModel