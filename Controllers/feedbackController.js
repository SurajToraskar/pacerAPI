const feedback = require('../Models/adminModel/feedbackModel');


exports.feedbackUpload = async (req, resp) => {
    const feedbackData = new feedback({
        "link": req.body.link
    })
    const dataSaved = await feedbackData.save();
    resp.status(200).json(dataSaved);

};

exports.feedbackDelete = async (req, resp) => {
    const feedbackData = await feedback.deleteOne({ _id: req.params.id });
    resp.status(200).json(feedbackData);
}

exports.feedbackView=async(req,resp)=>{
    const feedbackData=await feedback.findById(req.params.id);
    resp.status(200).json(feedbackData.link);
}

exports.feedbackViewAll=async(req,resp)=>{
    const feedbackData=await feedback.find();
    resp.status(200).json(feedbackData);

}