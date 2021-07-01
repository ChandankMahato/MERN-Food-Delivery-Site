//imports
const express = require('express');
const { requireSignin, userMiddleware } = require('../common-middleware');
const { addOrder, getOrders, getOrder } = require('../controller/order');
const router = express.Router();


router.post('/addOrder', requireSignin, userMiddleware, addOrder);
router.get('/getOrder',requireSignin,userMiddleware,getOrders);
router.post('/getOrder', requireSignin, userMiddleware, getOrder);

module.exports = router;