const notes = require('../Models/teacherModel/notes.js');
const cloudinary = require('../helpers/cloudinaryUpload.js')


exports.notesUpload = async (req, resp) => {
    const file = req.files.uploadnote;
    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
        const data = new notes({
            "title": req.body.title,
            "instruction": req.body.instruction,
            "teacher_id": req.body.teacher_id,
            "subject_id": req.body.subject_id,
            "file_path": result.url

        })
        console.log(result)
        const dataSaved = await data.save();
        resp.status(200).json(dataSaved);
    })

}

exports.notesDelete = async (req, resp) => {
    const data = await notes.findById(req.params.id);
    const imageUrl = data.file_path;
    const urlArray = imageUrl.split('/');
    const image = urlArray[urlArray.length - 1];
    const imageName = image.split('.')[0];

    notes.deleteOne({ _id: req.params.id }).then(() => {
        cloudinary.uploader.destroy(imageName, (error, result) => {
            resp.send(result);
        }).catch((error) => {
            resp.send(error);
        })
    }).catch((error) => {
        resp.send(error);
    })
}

exports.notesView = async (req, resp) => {
    const data = await notes.findById(req.params.id).populate('teacher_id', ['name']).populate('subject_id', ['name']);
    const imagePath = data.file_path;
    resp.send(imagePath);
    console.log(data.teacher_id.name);
    console.log(data.subject_id.name);
}

exports.notesViewAll = async (req, resp) => {
    const data = await notes.find();
    resp.send(data);
}

// exports.notesViewAllPdf = async (req, resp) => {
//     const data = await notes.find();
//     resp.send(data);
//     const newData = data.map((element) => {
//         return element.file_path;
//     })
//     resp.send(newData);
// }
