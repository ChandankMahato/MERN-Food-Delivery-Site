//impors
const express = require('express');
const { addCategory, getCategories, updateCategories, deleteCategories} = require('../controller/category');
const { requireAdminSignin, adminMiddleware} = require('../common-middleware');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
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
router.post('/category/create',requireAdminSignin,adminMiddleware,upload.single('categoryImage'),addCategory);
router.get('/category/getCategory', getCategories);
router.post('/category/update',requireAdminSignin,adminMiddleware,upload.array('categoryImage'), updateCategories);
router.post('/category/delete', requireAdminSignin, adminMiddleware, deleteCategories);

module.exports = router;