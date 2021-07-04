const adminAuth = require('../../models/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');


exports.signup = (req,res)=>{

        adminAuth.findOne({mobile: req.body.mobile})
        .exec( async (error, admin) =>{
            if(error || admin) return res.status(206).json({
                message: 'Admin already registered'
            });

        const {
            fullName,
            mobile,
            password
        } = req.body;

        const hash_password = await bcrypt.hash(password, 10);
        const _admin = new adminAuth({ 
            fullName, 
            mobile, 
            hash_password, 
            username: shortid.generate(),
            role: 'admin'
        });

        _admin.save((error, data) => {
            if(error){
                return res.status(400).json({
                    message: 'Something went Wrong'
                });
            }

            if(data){
                return res.status(201).json({
                    message: data
                })
            }
        });
    });
}

exports.signin = (req, res) => {
    adminAuth.findOne({mobile: req.body.mobile})
    .exec((error,admin)=>{
        if(error){
            return res.status(400).json({error});
        }
        if(admin){
            const isPasswordMatch = admin.authenticate(req.body.password)
            if(isPasswordMatch && admin.role === 'admin'){
                const adminToken = jwt.sign({id: admin._id, role: admin.role, fullName:admin.fullName}, process.env.JWT_SECRET,{expiresIn: '1h'});
                const {
                    _id,
                    fullName,
                    mobile,
                    role
                } = admin;

                res.cookie('adminToken', adminToken, { expiresIn: '1h'});

                res.status(200).json({
                    adminToken,
                    admin: {
                        _id,mobile, role, fullName
                    }
                });
            }else{
                return res.status(206).json({
                    message: 'Given password does not match our credentials.'
                })
            }
        }
        else{
            return res.status(206).json({
                message: 'Asmin Does Not Exist!'
            });
        }
    });
}



exports.signout = (req,res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Signout Successfully...!'
    })
}