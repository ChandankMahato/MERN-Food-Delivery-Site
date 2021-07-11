//impors
const express = require('express');
const { addBanner, getbanners, deleteBanners } = require('../controller/banner');
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
router.post('/add/banner',requireAdminSignin,adminMiddleware,upload.single('bannerImage'),addBanner);
router.get('/getBanner', getbanners);
router.post('/banner/delete', requireAdminSignin, adminMiddleware, deleteBanners);

module.exports = router;