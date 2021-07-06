
const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) => {

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
}

exports.requireAdminSignin = (req, res, next) => {
    if(req.headers.adminauthorization){
        const adminToken = req.headers.adminauthorization.split(" ")[1];
        const adminAuth = jwt.verify(adminToken, process.env.JWT_SECRET);
        req.adminAuth = adminAuth; 
    }else{
        return res.status(400).json({
            message: 'Authorization Required'
        })
    }
    next();
}

exports.userMiddleware = (req, res, next) => {
    if(req.auth.role !== 'user'){
        return res.status(400).json({
            message: 'Admin Access Denied'
        })
    }
    next();
}

exports.adminMiddleware = (req, res,next) => {
    if(req.adminAuth.role !== 'admin'){
        return res.status(400).json({
            message: 'User Access Denied'
        })
    }
    next();
}