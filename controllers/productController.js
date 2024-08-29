const Product = require("../models/productModel");
const { getPostData } = require("../utils");

// @desc  Gets All Products
// @route GET  /api/products
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

// @desc  Get Single Product
// @route GET  /api/product/:id
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
    const body = await getPostData(req);
    const { title, description, price } = JSON.parse(body);

    const product = {
      title,
      description,
      price,
    };

    const newProduct = await Product.create(product);

    res.writeHead(201, { "Content-Type": "application/json" });

    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

// @desc  Update a Product
// @route Put  /api/products
async function updateProduct(req, res, id) {
  try {
    const product = Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "Product Not Found" }));
      res.end();
    } else {
      const body = await getPostData(req);
      const { title, description, price } = JSON.parse(body);

      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };

      const updatedProduct = await Product.update(id, productData);

      res.writeHead(200, { "Content-Type": "application/json" });
      console.log("controller.js", "id: ", id);
      return res.end(JSON.stringify(updatedProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc  Delete Product
// @route DELETE  /api/product/:id
async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "Product Not Found" }));
      res.end();
    } else {
      await Product.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: `Product ${id} removed` }));
      res.end();
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
