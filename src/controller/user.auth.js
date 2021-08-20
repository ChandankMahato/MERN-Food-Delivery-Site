const userAuth = require('../models/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

exports.signup = (req, res) => {

        //finding data in database
        userAuth.findOne({ mobile: req.body.mobile })
        .exec( async (error, user) => {
            if(error || user) return res.status(206).json({
                message: 'User Already Registered'
            });

        const {
            fullName,
            mobile,
            password,
            resetCode,
        } = req.body;
        const hash_password = await bcrypt.hash(password, 10);

        const _user = new userAuth({
            fullName,
            mobile,
            hash_password,
            resetCode:Math.floor(Math.random()*1000000),
            username: shortid.generate(),
            role: 'user'
        });

        //saving the data to database
        _user.save((error, data) => {
            if(error){
                return res.status(400).json({
                    message: 'Something went wrong'
                });
            }

            if(data){
                return res.status(201).json({
                    message: data
                });
            }
        });
    });
}

exports.singin = (req, res) => {
    userAuth.findOne({ mobile: req.body.mobile})
    .exec(async (error, user) => {
        if(error){
            return res.status(400).json({error});
        }
        if(user){
            const isPasswordMatch = await user.authenticate(req.body.password);
            if(isPasswordMatch && user.role === 'user'){
                const token = jwt.sign({ id: user._id, role: user.role, fullName: user.fullName}, process.env.JWT_SECRET, {expiresIn: '60d'});

                //creating cookie during signin
                res.cookie('token', token, {expiresIn: '1h'});

                const {
                    _id,
                    fullName,
                    mobile,
                    role,
                } = user;
                res.status(200).json({
                    token,
                    user: {
                        _id, fullName, mobile, role
                    }
                });
            }else{
                return res.status(206).json({
                    message: 'Given password does not match our credentials.'
                });
            }
        }else{
            return res.status(206).json({
                message: 'User Does Not Exist!'
            });
        }
    });
}

exports.setNewPassword = async (req, res) => {
    const {resetPassword, mobileNumber, typeCode}= req.body.payload;
    const newPassword = resetPassword;
    const hash_new_password = await bcrypt.hash(newPassword, 10)
    userAuth.updateOne({mobile:mobileNumber, resetCode:typeCode},
    { 
        $set:{
            hash_password:hash_new_password,
            resetCode:Math.floor(Math.random()*1000000)
        }
    }).exec((error, response) => {
        if(error) return res.status(400).json({error});
        if(response && response.nModified === 1){
            res.status(201).json({response});
        }else{
            res.status(400).json({response});
        }
    });
}


exports.signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Signout Successfully...!'
    })
}