const Order = require("../models/order");
const Cart = require("../models/cart");
const Address = require("../models/address");

exports.addOrder = (req, res) => {

    Cart.deleteOne({ user: req.auth.id})
    .exec((error, result) => {
        if(error) return res.status(400).json({error});
        if(result){
            req.body.userId = req.auth.id;
            req.body.dbStatus = [
                {
                    dbtype: "CR",
                    isSelected: true,
                },
                {
                    dbtype: "B1",
                    isSelected: false,
                },
                {
                    dbtype: "B2",
                    isSelected: false,
                },
                {
                    dbtype: "B3",
                    isSelected: false,
                },
                {
                    dbtype: "B4",
                    isSelected: false,
                },
                {
                    dbtype: "B5",
                    isSelected: false,
                }
            ];
            req.body.orderStatus = [
                {
                    type: "ORDERED",
                    date: new Date(),
                    isCompleted: true,
                },
                {
                    type: "COOKED",
                    isCompleted: false,
                },
                {
                    type: 'PACKED',
                    isCompleted: false,
                },
                {
                    type: 'ON THE WAY',
                    isCompleted: false,
                },
                {
                    type: 'DELIVERED',
                    isCompleted: false,
                }
            ];
            const order = new Order(req.body);
            order.save((error, order) => {
                if(error) return res.status(400).json({error});
                if(order){
                    res.status(201).json({order});
                }
            });
        }
    });
};

exports.getOrders = (req, res) => {

    Order.find({ userId: req.auth.id})
    .select('_id userId addressId totalAmount items paymentStatus paymentType orderStatus, dbStatus')
    .populate('userId', '_id fullName mobile password')
    .populate('items.productId', '_id name slug price description productPictures category')
    .populate('addressId','customerAddress')
    .exec((error, order) => {
        if(error) res.status(400).json({error});
        if(order) {
            res.status(200).json({order});
        }
    })

}

exports.getOrder = (req, res) => {
    Order.findOne({ _id: req.body.orderId})
    .populate("item.productId", "_id name productPictures")
    .lean()
    .exec((error, order) => {
        if(error) return res.status(400).json({error});
        if(order){
            Address.findOne({
                userId: req.auth.id,
            }).exec((error, address) => {
                if(error) return res.status(400).json({error});
                order.address = address.address.find(
                    (adr) => adr._id.toString() = order.addressId.toString()
                );
                res.status(200).json({
                    order,
                });
            });
        }
    });
};