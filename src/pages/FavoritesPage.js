import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function FavoritesPage() {
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductStock, setNewProductStock] = useState("");
  const [newBrandName, setNewBrandName] = useState("");
  const [message, setMessage] = useState("");
  const [newBrandId, setNewBrandId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/getProducts")
      .then((response) => {
        setProductList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct || !quantity) {
      setMessage("Please select a product and enter a quantity.");
      return;
    }
    try {
      await axios.post("http://localhost:3001/addStock", {
        productName: selectedProduct,
        quantity: parseInt(quantity),
      });
      setMessage("Stock added successfully.");
      setSelectedProduct("");
      setQuantity("");
    } catch (error) {
      console.error("Error adding stock:", error);
      setMessage("Error adding stock. Please try again.");
    }
  };

  const handleAddNewProduct = async () => {
    if (!newProductName || !newProductPrice || !newProductStock) {
      setMessage("Please enter product details.");
      return;
    }
    try {
        await axios.post("http://localhost:3001/addProduct", {
          brandId: newBrandId,
          productName: newProductName,
          price: parseFloat(newProductPrice),
          stock: parseInt(newProductStock),
        });
        setMessage("Product added successfully.");
        axios
          .get("http://localhost:3001/getProducts")
          .then((response) => {
            setProductList(response.data);
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
          });

        setNewProductName("");
        setNewProductPrice("");
        setNewProductStock("");
        setNewBrandId("");
      } catch (error) {
        console.error("Error adding product:", error);
        setMessage("Error adding product. Please try again.");
      }
  };

  const handleAddNewBrand = async () => {
    if (!newBrandName) {
      setMessage("Please enter brand name.");
      return;
    }
    try {
      await axios.post("http://localhost:3001/addBrand", {
        brandName: newBrandName,
      });
      setMessage("Brand added successfully.");
      setNewBrandName("");
    } catch (error) {
      console.error("Error adding brand:", error);
      setMessage("Error adding brand. Please try again.");
    } 
  };

  return (
    <div>
      <div className="app-container">
        <h2>Add Stock</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="product" className="label">
              Products:
            </label>
            <select
              id="product"
              className="input"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Select a product</option>
              {productList.map((prod) => (
                <option key={prod._id} value={prod.P_name}>
                  {prod.P_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="quantity" className="label">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              className="input"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <button className="btn" type="submit">
            Add Stock
          </button>
        </form>
      </div>

      <div className="app-container">
        <h2>Add New Product</h2>
        <p>If the brand of the product is new, scroll down and add the brand first</p>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="newProductName" className="label">
              Product Name:
            </label>
            <input
              id="newProductName"
              type="text"
              value={newProductName}
              className="input"
              onChange={(e) => setNewProductName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newProductPrice" className="label">
              Price:
            </label>
            <input
              id="newProductPrice"
              type="number"
              value={newProductPrice}
              className="input"
              onChange={(e) => setNewProductPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newProductStock" className="label">
              Stock:
            </label>
            <input
              id="newProductStock"
              type="number"
              value={newProductStock}
              className="input"
              onChange={(e) => setNewProductStock(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newBrandId" className="label">
              Brand ID:
            </label>
            <input
              id="newBrandId"
              type="text"
              value={newBrandId}
              className="input"
              onChange={(e) => setNewBrandId(e.target.value)}
            />
          </div>
          <button className="btn" onClick={handleAddNewProduct}>
            Add Product
          </button>
        </form>
      </div>

      <div className="app-container">
        <h2>Add New Brand</h2>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="newBrandName" className="label">
              Brand Name:
            </label>
            <input
              id="newBrandName"
              type="text"
              value={newBrandName}
              className="input"
              onChange={(e) => setNewBrandName(e.target.value)}
            />
          </div>
          <button className="btn" onClick={handleAddNewBrand}>
            Add Brand
          </button>
        </form>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default FavoritesPage;
