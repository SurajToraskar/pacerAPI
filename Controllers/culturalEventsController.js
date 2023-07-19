const culturalEvents=require("../Models/adminModel/culturalEventsModel");
const cloudinary = require('../helpers/cloudinaryUpload.js');

exports.culturalEventUpload = async (req, resp) => {
    const file = req.files.uploadculturalevent;
    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
        const data = new culturalEvents({
            "title": req.body.title,
            "description": req.body.description,
            "link": result.url

        })
        console.log(result)
        const dataSaved = await data.save();
        resp.status(200).json(dataSaved);
    })

}


exports.culturalEventDelete = async (req, resp) => {
    const data = await culturalEvents.findById(req.params.id);
    console.log(req.params.id);
    console.log(data);
    const imageUrl = data.link;
    const urlArray = imageUrl.split('/');
    const image = urlArray[urlArray.length - 1];
    const imageName = image.split('.')[0];

    culturalEvents.deleteOne({ _id: req.params.id }).then(() => {
        cloudinary.uploader.destroy(imageName, (error, result) => {
            resp.send(result);
        }).catch((error) => {
            resp.send(error);
        })
    }).catch((error) => {
        resp.send(error);
    })
}

exports.culturalEventView = async (req, resp) => {
    const data = await culturalEvents.findById(req.params.id);
    console.log(data);
    const imagePath = data.link;
    resp.status(200).send(imagePath);
}


exports.culturalEventViewAll = async (req, resp) => {
    const data = await culturalEvents.find();
    const newData = data.map((element, index, array) => {
        return element.link;
    })
    resp.status(200).send(newData);
}
