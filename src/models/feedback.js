const mongoose = require('mongoose');

const feedBackSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Mobile: {
        type: Number,
        required: true,
    },
    Message: {
        type: String,
        required: true,
    }

}, {timeStamps: true});

module.exports = mongoose.model('feedBack', feedBackSchema);