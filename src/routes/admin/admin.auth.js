//imports
const express = require('express');
const { signin, signup, signout, CustomerDetails, setResetCode } = require('../../controller/admin/admin.auth');
const { validateSigninRequest, isRequestValidated, validateSignupRequest } = require('../../validators/auth');
const { requireAdminSignin, adminMiddleware } = require('../../common-middleware');
const router = express.Router();


//api
router.post('/admin/signin',validateSigninRequest,isRequestValidated, signin);
router.post('/admin/signup',validateSignupRequest,isRequestValidated, signup);
router.post(`/admin/resetCode`,requireAdminSignin,adminMiddleware,setResetCode);
router.get(`/admin/customerDetails`, requireAdminSignin,adminMiddleware,CustomerDetails);
router.post('/admin/signout', signout);

module.exports = router;