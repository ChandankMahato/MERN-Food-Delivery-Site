const Order = require("../models/order");
const Cart = require("../models/cart");
const Address = require("../models/address");
const userAuth = require('../models/auth');

exports.addOrder = (req, res) => {

    userAuth.findOne({_id : req.auth.id})
    .exec(async(error, user) => {
        if(error){
            res.status(400).json({error});
        }
        if(user){
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
        }else{
            res.status(500).json('Something Went Wrong!');
        }
    })
};

exports.getUserOrders = (req, res) => {
    Order.find({ userId: req.auth.id})
    .select('_id userId address_id address_name address_mobileNumber address_locality address_landmark address_address address_alternatePhone address_addressType totalAmount items paymentStatus paymentType orderStatus dbStatus createdAt updatedAt')
    .populate('userId', '_id fullName mobile')
    .populate('items.productId', '_id name slug price description productPictures category')
    .populate('items.categoryId', 'name')
   .exec((error, userOrders) => {
       if(error) res.status(400).json({error});
       if(userOrders) {
           res.status(200).json({userOrders});
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

exports.deleteOrder = async (req, res) => {
    const { OrderId } = req.body.payload;
    if(OrderId){
        Order.deleteOne({ _id: OrderId }).exec((error, result) => {
            if(error) return res.status(400).json({ error });
            if(result){
                res.status(202).json({ message: 'Order Deleted'});
            }
        });
    }else{
        res.status(400).json({ error: "Params requred "});
    }
};