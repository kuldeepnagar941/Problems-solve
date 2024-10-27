const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const varifyauth = require('../middlewares/verifyauth')


router.post('/products', varifyauth,productController.createProduct);
router.get('/products',varifyauth, productController.getAllProducts);
router.get('/products/:id', varifyauth,productController.getOneProduct);
router.put('/products/:id',varifyauth, productController.updateProduct);
router.delete('/products/:id',varifyauth, productController.deleteProduct);

module.exports = router;
