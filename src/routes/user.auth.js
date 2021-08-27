
const express = require('express');
const { requireAdminSignin, adminMiddleware } = require('../common-middleware');
const { singin, signup, signout, setNewPassword, deleteAccount } = require('../controller/user.auth');
const { validateSigninRequest, isRequestValidated, validateSignupRequest } = require('../validators/auth');
const router = express.Router();

//api
router.post('/user/signin',validateSigninRequest,isRequestValidated, singin);
router.post('/user/signup',validateSignupRequest,isRequestValidated, signup);
router.post('/user/resetPassword',setNewPassword);
router.post('/user/signout', signout);
router.post('/customer/delete', requireAdminSignin, adminMiddleware, deleteAccount);
module.exports = router;