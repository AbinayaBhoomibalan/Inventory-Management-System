const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const BrandModel = require('./models/brand');
const ProductModel = require('./models/products');
const InvoiceModel = require('./models/invoice');
const { ObjectId } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/inventory_management")
.then(() => {
    console.log("Successfully connected to MongoDB");
    
    app.get('/getProducts', (req, res) => {
        ProductModel.find().then(product => {
            console.log("Hello");
            console.log(product);
            res.json(product);
        }
        )
        .catch(err => res.status(500).json({ error: err.message }));
    });

    app.get('/getBrands', (req, res) => {
        BrandModel.find().then(Brand => {
            console.log("Hey");
            console.log(Brand);
            res.json(Brand);
        }
        )
        .catch(err => res.status(500).json({ error: err.message }));
    });

    app.post('/addStock', async (req, res) => {
        const { productName, quantity } = req.body;
        try {
          console.log("Hereee")
          const product = await ProductModel.findOne({ P_name: productName });
          if (!product) {
            return res.status(404).json({ error: 'Product not found' });
          }
          product.P_stock += parseInt(quantity);
          console.log("What's wrong?");
          await product.save();
          res.json({ message: 'Stock added successfully' });
        } catch (error) {
          console.error('Error adding stock:', error);
          res.status(500).json({ error: 'Error adding stock' });
        }
      });


      app.post('/addBrand', (req, res) => {
        console.log("LOggg");
        const { brandName } = req.body;
        console.log("You know");
        const newBrand = new BrandModel({
            Brand_name: brandName
        });
       
        newBrand.save()
        .then(() => res.json({ message: 'Brand added successfully.' }))
        .catch(err => res.status(500).json({ error: err.message }));
    });

    app.post('/addProduct', (req, res) => {
        const { productName, price, stock, brandId } = req.body;
        const newProduct = new ProductModel({
            B_id: brandId,
            S_id: '664208ff59dca2a4a1086c54',
            P_name: productName,
            P_price: price,
            P_stock: stock,
            Added_date: new Date()
        });
        newProduct.save()
        .then(() => res.json({ message: 'Product added successfully.' }))
        .catch(err => res.status(500).json({ error: err.message }));
    });

    app.post('/removeStock', async (req, res) => {
        const { products } = req.body; // Destructure the products array from the request body
    
        try {
            for (let product of products) {
                const { productName, quantity } = product;
                const productFromDb = await ProductModel.findOne({ P_name: productName });
    
                if (!productFromDb) {
                    return res.status(404).json({ error: `Product ${productName} not found` });
                }
    
                productFromDb.P_stock -= parseInt(quantity);
    
                if (productFromDb.P_stock < 0) {
                    return res.status(400).json({ error: `Insufficient stock for ${productName}` });
                }
    
                await productFromDb.save();
            }
    
            res.json({ message: 'Stock deducted successfully for all products' });
        } catch (error) {
            console.error('Error deducting stock:', error);
            res.status(500).json({ error: 'Error deducting stock' });
        }
    });

    app.post('/addInvoice', (req, res) => {
        const { customerName, productName, quantity, price } = req.body;
        const newInvoice = new InvoiceModel({
            C_name: customerName,
            P_name: productName,
            P_price: price,
            Quantity: quantity
        });
        newInvoice.save()
        .then(() => res.json({ message: 'Invoice added successfully.' }))
        .catch(err => res.status(500).json({ error: err.message }));
    });

    // Start the server after defining route handlers
    app.listen(3001, () => {
        console.log("Server is running");
    });
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});