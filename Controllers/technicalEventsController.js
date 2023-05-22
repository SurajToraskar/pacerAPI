const technicalEvents = require("../Models/adminModel/technicalEventsModel");
const cloudinary = require('../helpers/cloudinaryUpload.js');

exports.technicalEventUpload = async (req, resp) => {
    const file = req.files.uploadtechnicalevent;
    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
        const data = new technicalEvents({
            "title": req.body.title,
            "description": req.body.description,
            "link": result.url

        })
        console.log(result)
        const dataSaved = await data.save();
        resp.status(200).json(dataSaved);
    })

}


exports.technicalEventDelete = async (req, resp) => {
    const data = await technicalEvents.findById(req.params.id);
    console.log(req.params.id);
    console.log(data);
    const imageUrl = data.link;
    const urlArray = imageUrl.split('/');
    const image = urlArray[urlArray.length - 1];
    const imageName = image.split('.')[0];

    technicalEvents.deleteOne({ _id: req.params.id }).then(() => {
        cloudinary.uploader.destroy(imageName, (error, result) => {
            resp.send(result);
        }).catch((error) => {
            resp.send(error);
        })
    }).catch((error) => {
        resp.send(error);
    })
}

exports.technicalEventView = async (req, resp) => {
    const data = await technicalEvents.findById(req.params.id);
    console.log(data);
    const imagePath = data.link;
    resp.send(imagePath);
}


exports.technicalEventViewAll = async (req, resp) => {
    const data = await technicalEvents.find();
    console.log(data);
    resp.send(data);
}
