const notice=require("../Models/adminModel/noticeModel");
const cloudinary = require('../helpers/cloudinaryUpload.js');

exports.noticeUpload=async(req,resp)=>{
    const file = req.files.uploadnotice;
    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
        const data = new notice({
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

exports.noticeView = async (req, resp) => {
    const data = await notice.findById(req.params.id);
    const imagePath = data.filepath;
    resp.send(imagePath);
}