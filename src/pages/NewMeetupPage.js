import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NewMeetupPage.css";

function NewMeetupPage() {
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/getProducts')
      .then(products => {
        setProducts(products.data);
      })
      .catch(err => console.log(err));
    
    axios.get('http://localhost:3001/getBrands')
      .then(brands => {
        setBrands(brands.data);
      })
        .catch(err => console.log(err));
      
  },
   []);

  return (
    <div className="container">
      <div className="mt - 3">
        <h3>Products</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Available stock</th>
              <th>Price per unit</th>
            </tr>
          </thead>
          <tbody>
            {
            products.map(brand => {
              return <tr>
                <td>{brand._id}</td>
                <td>{brand.P_name}</td>
                <td>{brand.P_stock}</td>
                <td>{brand.P_price}</td>
              </tr>
            })
            }
          </tbody>
        </table>
      </div>

      <div className="mt - 3">
        <h3>Brands</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Brand Name</th>
            </tr>
          </thead>
          <tbody>
            {
            brands.map(brand => {
              return <tr>
                <td>{brand._id}</td>
                <td>{brand.Brand_name}</td>
              </tr>
            })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NewMeetupPage;
