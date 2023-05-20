const questionPaper = require('../Models/teacherModel/questionPaper.js');
const cloudinary = require('../helpers/cloudinaryUpload.js');


exports.QpaperUpload = async (req, resp) => {
    const file = req.files.uploadqpaper;
    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
        const data = new questionPaper({
            "teacher_id": req.body.teacher_id,
            "subject_id": req.body.subject_id,
            "file_path": result.url

        })
        console.log(result);
        const dataSaved = await data.save();
        resp.status(200).json(dataSaved);
    })

}

exports.QpaperDelete = async (req, resp) => {
    const data = await questionPaper.findById(req.params.id);
    const imageUrl = data.file_path;
    const urlArray = imageUrl.split('/');
    const image = urlArray[urlArray.length - 1];
    const imageName = image.split('.')[0];

    questionPaper.deleteOne({ _id: req.params.id }).then(() => {
        cloudinary.uploader.destroy(imageName, (error, result) => {
            resp.send(result);
        }).catch((error) => {
            resp.send(error);
        })
    }).catch((error) => {
        resp.send(error);
    })
}
exports.QpaperView = async (req, resp) => {
    const data = await questionPaper.findById(req.params.id);
    const imagePath = data.file_path;
    resp.send(imagePath);
}