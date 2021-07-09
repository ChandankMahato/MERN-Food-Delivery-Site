//imports
const express = require('express');
const { requireSignin, userMiddleware } = require('../common-middleware');
const { addOrder, getUserOrders, getOrder } = require('../controller/order');
const router = express.Router();


router.post('/addOrder', requireSignin, userMiddleware, addOrder);
router.get('/getUserOrder',requireSignin,userMiddleware,getUserOrders);
router.post('/getOrder', requireSignin, userMiddleware, getOrder);

module.exports = router;