const Category = require('../models/category');
const slugify = require('slugify');
const shortid = require('shortid');

exports.addCategory = (req, res) => {
    
    const categoryObj = {
        name: req.body.name,
        slug: `${slugify(req.body.name)}-${shortid.generate()}`,//keeping name itself as slug
        createdBy: req.adminAuth.id
    }

    if(req.file){
        categoryObj.categoryImage = req.file.filename
    }

    const cat = new Category(categoryObj);

    cat.save((error, category) => {
        if(error) return res.status(400).json({ error });
        //if category added to database
        if(category){
            return res.status(201).json({ category });
        }
    })
}


exports.updateCategories = async (req, res) => {

    const {_id, name} = req.body;
    console.log(_id);
    console.log(name);
    
    const updatedCategories = [];

    if(name instanceof Array){

        //iterating throug req.body
        for(let i=0; i< name.length; i++){

            const category = {
                name: name[i],
                //WORK ON SLUG WILL BE DONE LATER
                //slug: `${slugify(req.body.name)}-${shortid.generate()}`,//keeping name itself as slug
                updatedBy: req.adminAuth.id
            };

            const updatedCategory= await Category.findOneAndUpdate({ _id: _id[i]}, category, {new: true});
            updatedCategories.push(updatedCategory);
        }
        return res.status(201).json({ updateCategories: updatedCategories});

    }else{
        const category = {
            name,
            //slug: `${slugify(req.body.name)}-${shortid.generate()}`,//keeping name itself as slug
            updatedBy : req.adminAuth.id
        };

        const updatedCategory= await Category.findOneAndUpdate({ _id }, category, {new: true});
        return res.status(201).json({ updatedCategory });
    }
}


exports.deleteCategories = async (req, res) => {

    const { ids } = req.body.payload;
    const deletedCategories = [];
    for(let i=0; i < ids.length; i++){
        const deleteCategory = await Category.findOneAndDelete({_id: ids[i]._id});
        deletedCategories.push(deleteCategory);
    }

    if(deletedCategories.length == ids.length){
        res.status(200).json({ message: 'Categories removed'});
    }else{
        res.status(400).json({ message: 'Something went wrong'});
    }
};

exports.getCategories = (req, res) => {
    
    Category.find({})
    .exec((error, categories) => {
        if(error) return res.status(400).json({error});

        if(categories){
            res.status(200).json({ categories });
        }
    })
}