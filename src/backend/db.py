import datetime
import pymongo 
import bson.objectid
from pymongo import MongoClient 
from bson.objectid import ObjectId

# Replace with your MongoDB connection string
client = MongoClient("mongodb://localhost:27017/")
db = client["inventory_management"]

# Define collections (equivalent to tables)
brands = db["Brand"]
stores = db["Stores"]
products = db["Products"]
transactions = db["Transaction"]  # Likely a better name than "Bill"
invoices = db["Invoice"]
provides = db["Provides"]

# Define Schemas (document structure)
brand_schema = {
    "_id": ObjectId,
    "Brand_name": str,
}

stores_schema = {
    "_id": ObjectId,
    "S_name": str,
    "Address": str,
    "Mobile_no": str,
}

products_schema = {
    "_id": ObjectId,
    "B_id": ObjectId,  # Foreign key reference to Brand collection
    "S_id": ObjectId,  # Foreign key reference to Stores collection
    "P_name": str,
    "GST": float,
    "P_stock": int,
    "P_price": float,
    "Added_date": datetime.datetime.now(datetime.timezone.utc),  # Using datetime.now() with timezone.utc
}

transactions_schema = {
    "_id": ObjectId,
    "Payment_Method": str,
    "Total_amount": float,
    "Discount": float,
}

invoices_schema = {
    "_id": ObjectId,
    "P_name": str,
    "Price": float,
    "Quantity": int,
}

provides_schema = {
    "_id": ObjectId,
    "Pid": ObjectId,  # Foreign key reference to Products collection
    "S_id": ObjectId,  # Foreign key reference to Stores collection
    "Discount": float,
}

# Create collections with validation rules (schema)
brands.create_index({"Brand_name": 1}, unique=True)  # Ensure unique brand names
stores.create_index({"S_name": 1}, unique=True)  # Ensure unique store names
products.create_index({"P_name": 1}, unique=True)  # Ensure unique product names within a store (assuming)
invoices.create_index({"P_name": 1})  # Optional index for faster lookup by product name
provides.create_index({"Pid": 1, "S_id": 1}, unique=True)  # Unique combination of product and store for discount offers

# Sample data insertion (refer to the image for more examples)
brands.insert_one({"Brand_name": "Apple"})
stores.insert_one({
    "S_name": "Main Street Store",
    "Address": "123 Main Street",
    "Mobile_no": "123-456-7890"
})
products.insert_one({
    "B_id": ObjectId(),  # Assuming you have the ObjectId for the brand
    "S_id": ObjectId(),  # Assuming you have the ObjectId for the store
    "P_name": "iPhone 12",
    "GST": 18.0,
    "P_stock": 100,
    "P_price": 799.99,
    "Added_date": datetime.datetime.now(datetime.timezone.utc)  # Using datetime.now() with timezone.utc
})
transactions.insert_one({
    "Payment_Method": "Credit Card",
    "Total_amount": 799.99,
    "Discount": 0.0
})
invoices.insert_one({
    "P_name": "iPhone 12",
    "Price": 799.99,
    "Quantity": 1
})
provides.insert_one({
    "Pid": ObjectId(),  # Assuming you have the ObjectId for the product
    "S_id": ObjectId(),  # Assuming you have the ObjectId for the store
    "Discount": 10.0
})

# Remember to close the connection when done
client.close()
