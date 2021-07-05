//importing mongoose
const mongoose = require('mongoose');


//Defining a Model
//Models are defined through the Schema interface.
//const Schema = mongoose.Schema;
const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    categoryImage: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth',
        required: true,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth',
    }
}, {timestamps: true });

module.exports = mongoose.model('Category', categorySchema);