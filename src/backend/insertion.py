from pymongo import MongoClient
from bson import ObjectId
import datetime

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["inventory_management"] # Replace 'your_database_name' with your actual database name

# Collections
brands = db["Brand"]
products = db["Products"]

# Sample data for brands
brand_data = [
    {"Brand_name": "Coca-Cola"},
    {"Brand_name": "Kellogg's"},
    {"Brand_name": "Nestlé"},
    {"Brand_name": "Pepsi"},
    {"Brand_name": "Lays"}
]

# Insert brands and retrieve their IDs
brand_ids = []
for brand in brand_data:
    result = brands.insert_one(brand)
    brand_ids.append(result.inserted_id)

# Sample data for products with associated brand IDs
product_data = [
    {"B_id": brand_ids[0],  # Use the first brand ID
     "P_name": "Coca-Cola Classic",
     "GST": 18.0,
     "P_stock": 100,
     "P_price": 2.49,
     "Added_date": datetime.datetime.now(datetime.timezone.utc)},
    {"B_id": brand_ids[1],  # Use the second brand ID
     "P_name": "Kellogg's Corn Flakes",
     "GST": 18.0,
     "P_stock": 150,
     "P_price": 3.99,
     "Added_date": datetime.datetime.now(datetime.timezone.utc)},
    {"B_id": brand_ids[2],  # Use the third brand ID
     "P_name": "Nestlé KitKat",
     "GST": 18.0,
     "P_stock": 200,
     "P_price": 1.99,
     "Added_date": datetime.datetime.now(datetime.timezone.utc)},
    {"B_id": brand_ids[3],  # Use the fourth brand ID
     "P_name": "Pepsi",
     "GST": 18.0,
     "P_stock": 120,
     "P_price": 2.29,
     "Added_date": datetime.datetime.now(datetime.timezone.utc)},
    {"B_id": brand_ids[4],  # Use the fifth brand ID
     "P_name": "Lays Classic Potato Chips",
     "GST": 18.0,
     "P_stock": 180,
     "P_price": 1.79,
     "Added_date": datetime.datetime.now(datetime.timezone.utc)},
    # Add more product data here
    {"B_id": brand_ids[0],
     "P_name": "Coca-Cola Zero",
     "GST": 18.0,
     "P_stock": 80,
     "P_price": 2.29,
     "Added_date": datetime.datetime.now(datetime.timezone.utc)},
    {"B_id": brand_ids[1],
     "P_name": "Kellogg's Special K",
     "GST": 18.0,
     "P_stock": 100,
     "P_price": 4.49,
     "Added_date": datetime.datetime.now(datetime.timezone.utc)},
    {"B_id": brand_ids[2],
     "P_name": "Nestlé Milo",
     "GST": 18.0,
     "P_stock": 150,
     "P_price": 3.29,
     "Added_date": datetime.datetime.now(datetime.timezone.utc)},
    {"B_id": brand_ids[3],
     "P_name": "Pepsi Max",
     "GST": 18.0,
     "P_stock": 100,
     "P_price": 2.49,
     "Added_date": datetime.datetime.now(datetime.timezone.utc)},
    {"B_id": brand_ids[4],
     "P_name": "Lays Sour Cream & Onion",
     "GST": 18.0,
     "P_stock": 120,
     "P_price": 1.99,
     "Added_date": datetime.datetime.now(datetime.timezone.utc)},
    # Add more product data here
    {"B_id": brand_ids[0],
     "P_name": "Coca-Cola Diet",
     "GST": 18.0,
     "P_stock": 90,
     "P_price": 2.29,
     "Added_date": datetime.datetime.now(datetime.timezone.utc)},
    {"B_id": brand_ids[1],
     "P_name": "Kellogg's Rice Krispies",
     "GST": 18.0,
     "P_stock": 120,
     "P_price": 3.99,
     "Added_date": datetime.datetime.now(datetime.timezone.utc)},
    {"B_id": brand_ids[2],
     "P_name": "Nestlé Nescafe",
     "GST": 18.0,
     "P_stock": 180,
     "P_price": 5.99,
     "Added_date": datetime.datetime.now(datetime.timezone.utc)},
    {"B_id": brand_ids[3],
     "P_name": "Pepsi Diet",
     "GST": 18.0,
     "P_stock": 80,
     "P_price": 2.49,
     "Added_date": datetime.datetime.now(datetime.timezone.utc)},
    {"B_id": brand_ids[4],
     "P_name": "Lays Barbecue Potato Chips",
     "GST": 18.0,
     "P_stock": 100,
     "P_price": 1.99,
     "Added_date": datetime.datetime.now(datetime.timezone.utc)},
    # Add more product data here
]

# Insert data into the Products collection
products.insert_many(product_data)
