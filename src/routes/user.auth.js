
const express = require('express');
const { requireSignin } = require('../common-middleware');
const { singin, signup, signout, setNewPassword } = require('../controller/user.auth');
const { validateSigninRequest, isRequestValidated, validateSignupRequest } = require('../validators/auth');
const router = express.Router();

//api
router.post('/user/signin',validateSigninRequest,isRequestValidated, singin);
router.post('/user/signup',validateSignupRequest,isRequestValidated, signup);
router.post('/user/resetPassword',setNewPassword);
router.post('/user/signout', signout);

module.exports = router;