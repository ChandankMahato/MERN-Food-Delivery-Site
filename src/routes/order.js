//imports
const express = require('express');
const { requireSignin, userMiddleware, adminMiddleware, requireAdminSignin } = require('../common-middleware');
const { addOrder, getUserOrders, getOrder, deleteOrder } = require('../controller/order');
const router = express.Router();


router.post('/addOrder', requireSignin, userMiddleware, addOrder);
router.get('/getUserOrder',requireSignin,userMiddleware,getUserOrders);
router.post('/getOrder', requireSignin, userMiddleware, getOrder);
router.post('/order/delete', requireAdminSignin, adminMiddleware, deleteOrder);

module.exports = router;