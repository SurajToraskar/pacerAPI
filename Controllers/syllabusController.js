const cloudinary = require('../helpers/cloudinaryUpload.js');
const syllabus = require('../Models/teacherModel/syllabus.js');


exports.syllabusUpload = async (req, resp) => {
    const file = req.files.uploadsyllabus;
    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
        const data = new syllabus({
            "year_id":req.params.id,
            "title": req.body.title,
            "instruction": req.body.instruction,
            "subject_id":req.body.subject_id,
            "file_path": result.url

        })
        console.log(result);
        const dataSaved = await data.save();
        resp.status(200).json(dataSaved);
    })

}

exports.syllabusUploadAll = async (req, resp) => {
    const file = req.files.uploadsyllabus;
    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
        const data = new syllabus({
            "year_id":req.body.year_id,
            "title": req.body.title,
            "instruction": req.body.instruction,
            "subject_id":req.body.subject_id,
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
    resp.status(200).send(imagePath);
}

exports.syllabusViewAll = async (req, resp) => {
    const data = await syllabus.find().populate('year_id', ['year']);
    resp.status(200).send(data);
}

// exports.syllabusLinks = async (req, resp) => {
//     const data = await syllabus.find({ year_id: req.params.id });
//     const newData = data.map((element, index, array) => {
//         return element.file_path;
//     })
//     resp.status(200).send(newData);

// }

exports.syllabusLinks = async (req, resp) => {
    try {
        const data = await syllabus.find({ year_id: req.params.id });
        const newData = data.map((element) => {
            return {
                file_path: element.file_path,
                title: element.title
            };
        });

        resp.status(200).send(newData);
    } catch (error) {
        resp.status(500).send('Error fetching question papers');
    }
};

