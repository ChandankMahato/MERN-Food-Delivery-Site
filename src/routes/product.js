const express = require('express');
const { requireSignin, adminMiddleware, userMiddleware } = require('../common-middleware');
const { createProduct, getProductsBySlug, deleteProduct, getProduct, updateProducts, getProductDetailsById, getProductsByCategory, getProductByCategory} = require('../controller/product');
const multer = require('multer');
const router = express.Router();
const shortid = require('shortid');
//bulit in libraray path.
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function(req, file, cb){
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage });

router.post('/product/create', requireSignin,adminMiddleware,upload.array('productPicture'), createProduct);
router.get('/products/getProducts', requireSignin, adminMiddleware, getProduct);
router.post('/Product/updateProduct', requireSignin, adminMiddleware,upload.array('productPicture'), updateProducts);
router.post('/products/delete', requireSignin, adminMiddleware, deleteProduct);
router.post('/getProduct/categoryId', getProductByCategory);

module.exports = router;