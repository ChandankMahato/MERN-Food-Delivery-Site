const Product = require('../models/product');

exports.initialData = async (req, res) => {

    var p=Math.floor(Math.random()*10);
    var r=Math.floor(Math.random()*p);

    const products = await Product.find().limit(8).skip(r)
    .select('_id name price quantity slug description productPictures subCategory category')
    .populate('category', '_id name')
    .exec();

    res.status(200).json({
        products
    });
};