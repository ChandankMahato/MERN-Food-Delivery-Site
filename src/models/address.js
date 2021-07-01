//importing mongoose
const mongoose = require('mongoose');

const userAddressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'auth'
    },
    address: [ 
    {
            name:{
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 100,
            required:true
        },
        mobileNumber: {
            type:String,
            required: true,
            trim: true,
        },
        locality: {
            type:String,
            required: true,
            trim: true,
            min: 5,
            max: 100,
        },
        address:{
            type: String,
            required: true,
            trim: true,
            min: 5,
            max: 100,
        },
        landmark: {
            type: String,
            min: 5, 
            max: 100,
        },
        alternatePhone: {
            type: String
        },
        addressType: {
            type: String,
            required: true,
            enum: ['home', 'Work'],
            required: true,
        }
    }
]
}, {timestamps: true});

module.exports = mongoose.model('UserAddress', userAddressSchema);
