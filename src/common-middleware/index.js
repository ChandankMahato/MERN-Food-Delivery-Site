//importing
const jwt = require('jsonwebtoken');

//This function ensure the authorization of user or admin
//here we initially assign the second part of token in the const token
//then we verify teh token with secret key
//and then user is authorized
//next function is called
exports.requireSignin = (req, res, next) => {

    //here it check that, if authorization exist then do the following task
    //if we not put this chekc here then authorization will be undefined thing.
    if(req.headers.authorization){ 
        const token = req.headers.authorization.split(" ")[1];
        const auth = jwt.verify(token, process.env.JWT_SECRET);
        req.auth = auth;
    }else{
        return res.status(400).json({
            message: 'Authorization Required'
        })
    }
    next();
    //jwt.decode()
}

//callback function to check whether user is loggedin or not
exports.userMiddleware = (req, res, next) => {
    if(req.auth.role !== 'user'){
        return res.status(400).json({
            message: 'Admin Access Denied'
        })
    }
    next();
}

//function to check whether admin is loggged in or not
exports.adminMiddleware = (req, res,next) => {
    if(req.auth.role !== 'admin'){
        return res.status(400).json({
            message: 'User Access Denied'
        })
    }
    next();
}