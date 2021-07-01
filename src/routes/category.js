//impors
const express = require('express');
const { addCategory, getCategories, updateCategories, deleteCategories, getCategory} = require('../controller/category');
const { requireSignin, adminMiddleware} = require('../common-middleware');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
//bulit in libraray path.
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function(req, file, cb){
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage });

//api (endpoints)
router.post('/category/create',requireSignin,adminMiddleware,upload.single('categoryImage'),addCategory);
router.get('/category/getCategory', getCategories);
router.post('/category/update',requireSignin,adminMiddleware, upload.array('categoryImage'), updateCategories);
router.post('/category/delete', requireSignin, adminMiddleware, deleteCategories);

module.exports = router;