const {check, validationResult} = require('express-validator');


//validation middlewares
// These methods are all available via require('express-validator')
//check([field, message])
// field: a string or an array of strings of field names to valiate against.
// message: an error message to use when failed validators don't specify a message
//.notEmpty() => Adds a validator to check if a value is not empty; that is, a stirng with a length of 1 or bigger.
//check('userName').notEmpty();
//complete=> check('username').notEmpty().withMessage(),

exports.validateSignupRequest = [
    check('fullName')
    .notEmpty()
    .withMessage('fullName is required'),
    check('mobile')
    .isMobilePhone()
    .withMessage('Valid Number is Required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('Password required must be at least 6 character long')
];

exports.validateSigninRequest = [
    check('mobile')
    .isMobilePhone()
    .withMessage('Valid Number is Required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('Password required must be at least 6 character long')
];

//validationResult(req) this method is available via require('express-validator')
//req: the express request object
//Returs: a Result object
//Extracts the validation errors from  a request and makes them available in a Result object.
//Each error returned by .array() and .mapped() methods has the following format by default:
exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({ error: errors.array()[0].msg});
    }
    next();
}