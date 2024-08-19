const Product = require("../models/productModel");

// @desc  Gets All Products
// @route Get  /api/products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(products));
    res.end();
  } catch (error) {
    console.error(error);
  }
}

// @desc  Gets Single Product
// @route Get  /api/product/:id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "Product Not Found" }));
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(product));
      res.end();
    }
  } catch (error) {
    console.error(error);
  }
}

// @desc  Create a Product
// @route Post  /api/products
async function createProduct(req, res) {
  try {
    console.log("controller");
    const product = {
      title: "Test Product",
      description: "This is my product",
      price: 100,
    };
    const newProduct = await Product.create(product);

    res.writeHead(201, { "Content-Type": "application/json" });

    return res.end(JSON.stringify(newProduct));
  } catch (error) {}
}

module.exports = { getProducts, getProduct, createProduct };
