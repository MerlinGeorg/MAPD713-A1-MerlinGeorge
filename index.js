import express from "express";

const app = express();
app.use(express.json());

let datastore = {
  products: [],
};

// Initialize counters for GET and POST requests
let getRequestCount = 0;
let postRequestCount = 0;

const logRequestCounts = (req, res, next) => {
  console.log(`Processed Request Count --> GET: ${getRequestCount}, POST: ${postRequestCount}`);
  next();
};

// Retrieve all products
app.get("/products",(req, res) => {
    getRequestCount++;
    res.json(datastore.products);
    console.log("products GET: received request");
  },logRequestCounts
);

// Add new product
app.post("/product",(req, res) => {
    console.log("products POST: sending response");
    postRequestCount++;

    const productData = req.body;
    // Validate product data (must have productName and quantity)
    if (!productData || !productData.productName || !productData.quantity) {
      return res.status(400).json({ error: "Invalid Data" });
    }
    // Add the new product to the datastore
    datastore.products.push(productData);
    res.status(201).json(productData);
  },logRequestCounts
);

// Delete all products
app.delete("/products", (req, res) => {
  console.log("products DELETE: Delete all products");
  // Clear the datastore products array
  datastore.products = [];
  // Respond with a success message
  res.status(200).json({ message: "All products deleted" });
});

// Start the server on a specific port
app.listen(3000, () => {
  console.log("Server is listening at port 3000 \nEndpoint: http://127.0.0.1:3000/products , method: GET, DELETE \nEndpoint: http://127.0.0.1:3000/product , method: POST");
});
