//imports
const express = require('express');
const { addToCart, getCartItems, removeCartItems } = require('../controller/cart');
const { requireSignin, userMiddleware } = require('../common-middleware');
const router = express.Router();

//api(endpoints)
router.post('/user/cart/addtocart', requireSignin, userMiddleware, addToCart);
router.post('/user/getCartItems', requireSignin, userMiddleware, getCartItems);
router.post("/user/cart/removeItem", requireSignin, userMiddleware, removeCartItems);
module.exports = router;