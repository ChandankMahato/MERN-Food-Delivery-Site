//imports
const express = require('express');
const router = express.Router();
const { requireSignin, userMiddleware} = require('../common-middleware');
const { addAddress, getAddress, updateAddress } = require('../controller/address');

//routes
router.post('/user/address/create', requireSignin, userMiddleware, addAddress);
router.post('/user/getaddress', requireSignin, userMiddleware, getAddress);
module.exports = router;