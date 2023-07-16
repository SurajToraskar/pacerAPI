const notice=require("../Models/adminModel/noticeModel");
const cloudinary = require('../helpers/cloudinaryUpload.js');

exports.noticeUpload=async(req,resp)=>{
    const file = req.files.uploadnotice;
    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
        const data = new notice({
            "year_id":req.params.id,
            "title": req.body.title,
            "message": req.body.message,
            "filepath": result.url

        })
        console.log(data);
        console.log(result);
        const dataSaved = await data.save();
        resp.status(200).json(dataSaved);
    })
}

exports.noticeDelete = async (req, resp) => {
    const data = await notice.findById(req.params.id);
    const imageUrl = data.filepath;
    const urlArray = imageUrl.split('/');
    const image = urlArray[urlArray.length - 1];
    const imageName = image.split('.')[0];

    notice.deleteOne({ _id: req.params.id }).then(() => {
        cloudinary.uploader.destroy(imageName, (error, result) => {
            resp.send(result);
        }).catch((error) => {
            resp.send(error);
        })
    }).catch((error) => {
        resp.send(error);
    })
}

exports.viewSingleNotice = async (req, resp) => {
    const data = await notice.findById(req.params.id).populate('year_id',['year']);
    const imagePath = data.filepath;
    resp.send(imagePath);
}

exports.viewAllNotice=async(req,resp)=>{
    const data = await notice.find().populate('year_id',['year']);
    resp.status(200).json(data);
}

exports.viewNoticeLinks=async(req,resp)=>{
    const data=await notice.find({ year_id: req.params.id });
    const newData = data.map((element, index, array) => {
        return element.filepath
    })
    resp.send(newData);

}