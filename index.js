import express from "express";

const app = express();
app.use(express.json());

let datastore = {
  products: [],
};

// Retrieve all products
app.get("/products", (req, res) => {
  res.json(datastore.products);
});

// Add a new product with a unique ID
app.post("/product", (req, res) => {
  const productData = req.body;
  // Validate product data (must have productName and quantity)
  if (!productData || !productData.productName || !productData.quantity) {
    return res.status(400).json({ error: "Invalid Data" });
  }
  // Add the new product to the datastore
  datastore.products.push(productData);
  res.status(201).json(productData);
});

// Delete all products
app.delete("/product", (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  const productIndex = datastore.products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ error: `Product with ID ${id} is required` });
  }

  const deleteProduct = datastore.products.splice(productIndex, 1);

  res.status(200).json({
    message: `Product with ID ${id} deleted`,
    product: deletedProduct,
  });
});

// Start the server on a specific port
app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
