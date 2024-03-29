const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify');

exports.createProduct = (req, res) => {

    const {
        name, price,quantity, description, category, createdBy
    } = req.body

    let productPictures = [];
    if(req.files.length > 0){
        productPictures = req.files.map(file => {
            return {img: file.filename }
        })
    }

    const product = new Product({
        name: name,
        slug: `${slugify(name)}-${shortid.generate()}`,
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.adminAuth.id
    });

    product.save((error, product)=> {
        if(error) return res.status(400).json({ error });
        if(product){return res.status(201).json({ product });
        }
    });
};

exports.updateProducts = async (req, res) => {

   const {_id, name, price,quantity, description, category} = req.body;

       const product = {
           _id,
           name,
           price,
           quantity,
           description,
           category,
           updatedBy : req.adminAuth.id
       };
       if(category !== ""){
           product.category = category;
       }
       const updatedProduct = await Product.findOneAndUpdate({ _id }, product, {new: true});
       return res.status(202).json({ updatedProduct });
}

exports.getProduct = (req, res) => {
    const createdBy = req.adminAuth.id;
    if(createdBy){
        Product.find({})
        .select('category createdAt createdBy description name price productPictures quantity reviews slug updatedAt _id')
        .populate('category', 'name')
        .exec((error, products) => {
            if(error) return res.status(400).json({error});
            if(products){
                res.status(200).json({products});
            }
        });
    }else{
        return res.status(400).json({ message: 'something went wrong'});
    }
}

exports.deleteProduct = async (req, res) => {
    console.log('hello');
    const { productId } = req.body.payload;
    console.log(req.body.payload);
    if(productId){
        Product.deleteOne({ _id: productId }).exec((error, result) => {
            if(error) return res.status(400).json({ error });
            if(result){
                res.status(202).json({ message: 'Product Deleted'});
            }
        });
    }else{
        res.status(400).json({ error: "Params requred "});
    }
};

exports.getProductByCategory = (req, res) => {
    const { categoryId } = req.body;
        Product.find({ category: categoryId})
        .select('category createdAt createdBy description name price productPictures quantity reviews slug updatedAt _id')
        .populate('category','name _id')
        .exec((error, products) => {
            if(error){
                return res.status(400).json({error});
            }

            if(products){
                return res.status(200).json({products});
            }
        })
}
