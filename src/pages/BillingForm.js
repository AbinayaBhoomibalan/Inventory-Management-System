import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 
import Invoice from './Invoice';

function BillingForm() {
    const [formData, setFormData] = useState({
        productName: '',
        quantity: 0,
        price: 0,
    });
    const [invoiceProducts, setInvoiceProducts] = useState([]);
    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [message, setMessage] = useState('');
    const [invoiceData, setInvoiceData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/getProducts')
            .then(response => {
                console.log("Hello");
                console.log(response.data);
                setProductList(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleProductChange = (e) => {
        const selectedProductName = e.target.value;
        const selectedProductData = productList.find(product => product.P_name === selectedProductName);
        const selectedPrice = selectedProductData ? selectedProductData.P_price : 0;
        setSelectedProduct(selectedProductName);
        setFormData((prevFormData) => ({
            ...prevFormData,
            productName: selectedProductName,
            price: selectedPrice,
        }));
    };

    const handleAddProduct = () => {
        if (!selectedProduct || !formData.quantity) {
            setMessage('Please select a product and enter a quantity.');
            return;
        }
        const newProduct = {
            productName: selectedProduct,
            quantity: parseInt(formData.quantity),
            price: formData.price,
        };
        setInvoiceProducts([...invoiceProducts, newProduct]);
        setSelectedProduct('');
        setFormData({
            productName: '',
            quantity: 0,
            price: 0,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage('');

        if (!customerName) {
            setMessage('Please enter the customer name.');
            return;
        }
        if (invoiceProducts.length === 0) {
            setMessage('Please add at least one product.');
            return;
        }

        const totalAmount = invoiceProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
        const totalQuantity = invoiceProducts.reduce((total, product) => total + product.quantity, 0);

        try {
            await axios.post('http://localhost:3001/removeStock', {
                products: invoiceProducts
            });

            setInvoiceData({
                customerName: customerName,
                products: invoiceProducts,
                totalAmount: totalAmount,
                totalQuantity: totalQuantity
            });

            setMessage('Invoice generated successfully.');
        } catch (error) {
            console.error('Error generating invoice:', error);
            setMessage('Error generating invoice. Please try again.');
            return; 
        }

        try {
            await axios.post('http://localhost:3001/addInvoice', {
                customerName: customerName,
                productName: invoiceProducts[0].productName, 
                quantity: totalQuantity,
                price: totalAmount
            });

            setMessage('Invoice added successfully to the database.');
            
            setSelectedProduct('');
            setInvoiceProducts([]);
            setCustomerName('');
            setQuantity('');
        } catch (error) {
            console.error('Error adding invoice to the database:', error);
            setMessage('Error adding invoice to the database. Please try again.');
        }
    };

    return (
        <div className="app-container">
            <h1 className="heading">Billing Form</h1>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="customerName" className='label'>Customer Name:</label>
                <input
                    id="customerName"
                    className='input'
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}                 />
                <label htmlFor="product" className='label'>Products:</label>
                <select id="product" className='input' value={selectedProduct} onChange={handleProductChange}>
                    <option value="">Select a product</option>
                    {productList.map(prod => (
                        <option key={prod._id} value={prod.P_name}>{prod.P_name}</option>
                    ))}
                </select>
                <label className="label">
                    Quantity
                    <input
                        className="input"
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                    />
                </label>
                <label className="label">
                    Price
                    <input
                        className="input"
                        type="number"
                        name="price"
                        value={formData.price}
                        disabled                     />
                </label>
                <button type="button" className="btn" onClick={handleAddProduct}>Add Product</button>
                <button className="btn" type="submit">Generate Invoice</button>
            </form>
            {message && <p>{message}</p>}
            {invoiceProducts.length > 0 && (
                <div className="invoice">
                    <h2>Bill</h2>
                    <ul>
                        {invoiceProducts.map((product, index) => (
                            <li key={index}>
                                {product.productName} - {product.quantity} x ₹{product.price}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {invoiceData && <Invoice data={invoiceData} />}
        </div>
    );
}

export default BillingForm;
