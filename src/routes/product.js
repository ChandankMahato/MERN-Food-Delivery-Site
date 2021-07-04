const express = require('express');
const { requireAdminSignin, adminMiddleware} = require('../common-middleware');
const { createProduct, deleteProduct, getProduct, updateProducts, getProductByCategory} = require('../controller/product');
const multer = require('multer');
const router = express.Router();
const shortid = require('shortid');
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

router.post('/product/create', requireAdminSignin,adminMiddleware,upload.array('productPicture'), createProduct);
router.get('/products/getProducts', requireAdminSignin, adminMiddleware, getProduct);
router.post('/Product/updateProduct', requireAdminSignin, adminMiddleware,upload.array('productPicture'), updateProducts);
router.post('/products/delete', requireAdminSignin, adminMiddleware, deleteProduct);
router.post('/getProduct/categoryId', getProductByCategory);

module.exports = router;