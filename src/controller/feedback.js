const feedback = require("../models/feedback");

exports.addFeedBack= (req,res) => {
    const { name, mobile, message} = req.body.payload;

    const feedBackObj = {
        Name: name,
        Mobile: mobile,
        Message: message
    }

    const feedBack = new feedback(feedBackObj);
    feedBack.save((error, feedback) => {
        if(error) return res.status(400).json({error});
        if(feedback){
            console.log(feedback);
            return res.status(201).json({feedback});
        };
    });
};

exports.getFeedBack = (req, res) => {
    feedback.find({})
    .exec((error, feedBacks) => {
        if(error) return res.status(400).json(error);

        if(feedBacks){
            res.status(200).json({feedBacks});
        }
    })
}

exports.deleteFeedBack = async (req, res) => {
    const {feedbackId} = req.body.payload;
    if(feedbackId){
        feedback.deleteOne({_id: feedbackId}).exec((error, result) => {
            if(error) return res.status(400).json({error});
            if(result){
                res.status(202).json({message: 'FeedBack deleted'});
            }
        });
    }else{
        res.status(400).json({error: "Feedback Id Required"});
    }
};