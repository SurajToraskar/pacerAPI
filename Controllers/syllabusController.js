const cloudinary = require('../helpers/cloudinaryUpload.js');
const syllabus=require('../Models/teacherModel/syllabus.js');


exports.syllabusUpload = async (req, resp) => {
    const file = req.files.uploadsyllabus;
    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
        const data = new syllabus({
            "title": req.body.title,
            "instruction": req.body.instruction,
            "file_path": result.url

        })
        console.log(result);
        const dataSaved = await data.save();
        resp.status(200).json(dataSaved);
    })

}

exports.syllabusDelete = async (req, resp) => {
    const data = await syllabus.findById(req.params.id);
    const imageUrl = data.file_path;
    const urlArray = imageUrl.split('/');
    const image = urlArray[urlArray.length - 1];
    const imageName = image.split('.')[0];

    syllabus.deleteOne({ _id: req.params.id }).then(() => {
        cloudinary.uploader.destroy(imageName, (error, result) => {
            resp.send(result);
        }).catch((error) => {
            resp.send(error);
        })
    }).catch((error) => {
        resp.send(error);
    })
}

exports.syllabusView = async (req, resp) => {
    const data = await syllabus.findById(req.params.id);
    const imagePath = data.file_path;
    resp.send(imagePath);
}

exports.syllabusViewAll = async (req, resp) => {
    const data = await syllabus.find();
    resp.send(data);
}

