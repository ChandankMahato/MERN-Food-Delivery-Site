const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    bannerName:{
        type: String,
        required:true,
        trim: true
    },
    bannerImage:{
        type:String,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'auth',
        required:true,
    }
}, {timeStamps: true});

module.exports = mongoose.model('banner',bannerSchema );