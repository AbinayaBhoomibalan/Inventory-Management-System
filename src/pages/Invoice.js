import React from 'react';
import './Invoice.css'; // Import CSS file for styling

function Invoice({ data }) {
    const {  customerName, products, totalAmount, totalQuantity  } = data;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="invoice">
            <h2>Invoice</h2>
            <p><strong>Customer Name:</strong> {customerName}</p>
            <table className="invoice-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price per Unit</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.productName}</td>
                            <td>₹{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>₹{product.price * product.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3 className="total-amount">Total Amount: ₹{totalAmount}</h3>
            <button onClick={handlePrint} className="btn print-btn">Print Invoice</button>
        </div>
    );
}

export default Invoice;
