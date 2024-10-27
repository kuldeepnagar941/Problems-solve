const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
    const data = req.body;
    console.log(req.body);
    const { name } = req.body;
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
        return res.status(400).json({ message: "Product already exists" });
    }
    const product = new Product(data);
    await product.save();
    res.status(201).json(data);
};

exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
};

exports.getOneProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
        return res.status(400).json({ message: "Product does not exist" });
    }
    res.status(200).json(product);
};

exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(product);
};

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json(product);
};
