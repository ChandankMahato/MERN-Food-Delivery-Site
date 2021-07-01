//imports
const mongoose = require('mongoose');


//Defining a Model
//Models are defined through the Schema interface.
//const Schema = mongoose.Schema;
const productSchema = new mongoose.Schema({

    //objects
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type:Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    subCategory: {
        type: String,
        trim: true
    },
    offer: {
        type: Number
    },
    //array
    productPictures: [
        {
            img: {type: String}
        }
    ],
    //array
    reviews: [
        {
            //to give reviews we need
            // person who is creating review must have an accountt
            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'auth'},
            review: String
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
        required: true
    },
    createdBy: {
        //being foreign key
        type: mongoose.Schema.Types.ObjectId, ref: 'auth',
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'auth',
    }

}, {timestamps: true});


//accessing a model
// const MyModel = mongoose.model9('ModelName', mySchema);
module.exports = mongoose.model('Product', productSchema);