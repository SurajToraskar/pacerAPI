const assignment = require('../Models/teacherModel/assignment.js');
const cloudinary = require('../helpers/cloudinaryUpload.js');

exports.assignmentUpload = async (req, resp) => {
    const file = req.files.uploadassignment;
    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
        const data = new assignment({
            "title": req.body.title,
            "instruction": req.body.instruction,
            "teacher_id": req.body.teacher_id,
            "subject_id": req.body.subject_id,
            "year_id": req.body.year_id,
            "file_path": result.url

        })
        console.log(result)
        const dataSaved = await data.save();
        resp.status(200).json(dataSaved);
    })

}


exports.assignmentDelete = async (req, resp) => {
    const data = await assignment.findById(req.params.id);
    console.log(req.params.id);
    console.log(data);
    const imageUrl = data.file_path;
    const urlArray = imageUrl.split('/');
    const image = urlArray[urlArray.length - 1];
    const imageName = image.split('.')[0];

    assignment.deleteOne({ _id: req.params.id }).then(() => {
        cloudinary.uploader.destroy(imageName, (error, result) => {
            resp.send(result);
        }).catch((error) => {
            resp.send(error);
        })
    }).catch((error) => {
        resp.send(error);
    })
}

exports.viewSingleAssignment = async (req, resp) => {
    const data = await assignment.findById(req.params.id);
    console.log(data);
    const imagePath = data.file_path;
    resp.send(imagePath);
}

exports.viewAssignment = async (req, resp) => {
    const data = await assignment.find();
    resp.send(data);
}

exports.viewAssignmentLink = async (req, resp) => {
    const data = await assignment.find({ year_id: req.params.id });
    const newData = data.map((element, index, array) => {
        return element.file_path
    })
    resp.send(newData);
}
