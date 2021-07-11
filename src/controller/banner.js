const banner = require("../models/banner")

exports.addBanner = (req, res) => {
    const bannerObj = {
        bannerName: req.body.bannerName,
        createdBy: req.adminAuth.id
    }
    if(req.file){
        bannerObj.bannerImage = req.file.filename
    }

    const ban = new banner(bannerObj);
    ban.save((error, banner) => {
        if(error) return res.status(400).json({error});
        if(banner){
            return res.status(201).json({banner});
        };
    });
};

exports.getbanners = (req, res) => {
    banner.find({})
    .exec((error, banners) => {
        if(error) return res.status(400).json(error);

        if(banners){
            res.status(200).json({banners});
        }
    })
}


exports.deleteBanners = async (req, res) => {

    const { ids } = req.body.payload;
    const deletedBanners = [];
    for(let i=0; i < ids.length; i++){
        const deleteBanner = await banner.findOneAndDelete({_id: ids[i]._id});
        deletedBanners.push(deleteBanner);
    }

    if(deletedBanners.length == ids.length){
        res.status(200).json({ message: 'Banners removed'});
    }else{
        res.status(400).json({ message: 'Something went wrong'});
    }
};