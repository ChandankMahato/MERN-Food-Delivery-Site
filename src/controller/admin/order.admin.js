const Order = require("../../models/order");

exports.getCustomerOrders = async (req, res) => {

    const orders = await Order.find({})
    .select('_id userId address_id address_name address_mobileNumber address_locality address_landmark address_address address_alternatePhone address_addressType totalAmount items paymentStatus paymentType orderStatus')
    .populate('userId', '_id fullName mobile')
    .populate('items.productId', '_id name slug price description productPictures subCategory category')
    .populate('items.categoryId', 'name')
    .exec();
    res.status(200).json({ orders });
}


exports.adminUpdateOrder = (req, res) => {
    Order.updateOne({ _id: req.body.orderId, "orderStatus.type": req.body.type},
        {

            $set:{
                "orderStatus.$": [{type: req.body.type, date: new Date(),isCompleted: true}],
            },
        }
    ).exec((error, order) => {
        if(error) return res.status(400).json({error});
        if(order){
            res.status(201).json({order});
        }
    });
}
exports.adminUpdateDBStatus= (req, res) => {
    console.log(req.body.dbtype);
    Order.updateOne({ _id: req.body.orderId, "dbStatus.dbtype": req.body.dbtype},
        {
            $set:{
                "dbStatus.$": [{ dbtype: req.body.dbtype, isSelected: true}],
            },
        }
    ).exec((error, order) => {
        if(error) return res.status(400).json({error});
        if(order){
            res.status(201).json({order});
        }
    });
}