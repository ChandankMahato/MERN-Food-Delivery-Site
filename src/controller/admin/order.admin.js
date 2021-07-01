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
