const cloudinary = require('../helpers/cloudinaryUpload.js');
const timetable = require("../Models/teacherModel/timetable.js");


exports.timetableUpload = async (req, resp) => {
    const file = req.files.uploadtimetable;
    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
        const data = new timetable({
            "title":req.body.title,
            "year_id":req.params.id,
            "link": result.url

        })
        console.log(result);
        const dataSaved = await data.save();
        resp.status(200).json(dataSaved);
    })

}

exports.timetableDelete = async (req, resp) => {
    const data = await timetable.findById(req.params.id);
    const imageUrl = data.link;
    const urlArray = imageUrl.split('/');
    const image = urlArray[urlArray.length - 1];
    const imageName = image.split('.')[0];

    timetable.deleteOne({ _id: req.params.id }).then(() => {
        cloudinary.uploader.destroy(imageName, (error, result) => {
            resp.send(result);
        }).catch((error) => {
            resp.send(error);
        })
    }).catch((error) => {
        resp.send(error);
    })
}

exports.timetableView = async (req, resp) => {
    const data = await timetable.findById(req.params.id);
    const imagePath = data.link;
    resp.status(200).send(imagePath);
}

exports.timetableViewAll = async (req, resp) => {
    const data = await timetable.find().populate('year_id', ['year']);
    resp.status(200).send(data);
}

exports.timetableLinks = async (req, resp) => {
    const data = await timetable.find({ year_id: req.params.id });
    const newData = data.map((element, index, array) => {
        return element.link;
    })
    resp.status(200).send(newData);
}