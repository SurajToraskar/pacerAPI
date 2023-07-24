const feedback = require('../Models/adminModel/feedbackModel');


exports.feedbackUpload = async (req, resp) => {
    const feedbackData = new feedback({
        "year_id":req.params.id,
        "title":req.body.title,
        "description":req.body.description,
        "link": req.body.link
    })
    const dataSaved = await feedbackData.save();
    resp.status(200).json(dataSaved);

};

exports.feedbackUploadAll = async (req, resp) => {
    const feedbackData = new feedback({
        "year_id":req.body.year_id,
        "title":req.body.title,
        "description":req.body.description,
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
    const feedbackData=await feedback.find().populate('year_id',['year']);
    resp.status(200).json(feedbackData);

}
exports.feedbackLinks=async(req,resp)=>{
    const feedbackData=await feedback.find({ year_id: req.params.id });
    const newData = feedbackData.map((element, index, array) => {
        return { link: element.link, title: element.title };
    })
    resp.status(200).send(newData);
}

