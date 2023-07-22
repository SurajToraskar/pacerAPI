const questionPaper = require('../Models/teacherModel/questionPaper.js');
const cloudinary = require('../helpers/cloudinaryUpload.js');


exports.QpaperUpload = async (req, resp) => {
    const file = req.files.uploadqpaper;
    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
        const data = new questionPaper({
            "title": req.body.title,
            "teacher_id": req.body.teacher_id,
            "subject_id": req.body.subject_id,
            "year_id":req.params.id,
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

exports.viewQpaper = async (req, resp) => {
    const data = await questionPaper.find().populate('teacher_id',['name']).populate('subject_id',['name']).populate('year_id',['year']);
    resp.status(200).send(data);
}



exports.viewSingleQpaper = async (req, resp) => {
    const data = await questionPaper.findById(req.params.id);
    const imagePath = data.file_path;
    resp.status(200).send(imagePath);
}

//Old code
// exports.viewQpaperLink = async (req, resp) => {
//     const data = await questionPaper.find({ year_id: req.params.id });
//     const newData = data.map((element, index, array) => {
//         return element.file_path
//     })
//     resp.status(200).send(newData);

// }


//new code
exports.viewQpaperLink = async (req, resp) => {
    try {
        const data = await questionPaper.find({ year_id: req.params.id });
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
