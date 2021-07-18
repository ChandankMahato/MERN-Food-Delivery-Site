const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth',
        required: true,
    },
    address_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAddress",
        required: true,
    },
    address_name:{
        type: String,
        required: true,
    },
    address_mobileNumber:{
        type: Number,
        required: true,
    },
    address_locality:{
        type:String,
        required: true,
    },
    address_address: {
        type: String,
        required: true,
    },
    address_landmark:{
        type: String,
    },
    address_alternatePhone:{
        type: Number,
    },
    address_addressType:{
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            categoryId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
            },
            payablePrice:{
                type: Number,
                required: true,
            },
            purchasedQty: {
                type: Number,
                required: true,
            },
        },
    ],
    paymentStatus: {
        type: String,
        enum: ["PENDING", "COMPLETED", "cancelled", "refund"],
        required: true
    },
    paymentType:{
        type: String,
        enum: ["COD", "CARD"],
    },
    dbStatus:[
        {
            dbtype: {
                type: String,
                enum: ["CR","B1", "B2", "B3", "B4", "B5"],
                default: "CR",
            },
            isSelected: {
                type: Boolean,
                default: false,
            },
        },
    ],
    orderStatus: [
        {
            type: {
                type: String,
                enum: ["ORDERED", "COOKED", "PACKED", "ON THE WAY", "DELIVERED"],
                default: "ORDERED",
            },
            date: {
                type: Date,
            },
            isCompleted: {
                type: Boolean,
                default: false,
            },
        },
    ],

}, {timestamps: true});

module.exports = mongoose.model("Order", orderSchema);