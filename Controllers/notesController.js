const notes = require('../Models/teacherModel/notes.js');
const cloudinary = require('../helpers/cloudinaryUpload.js')


exports.notesUpload = async (req, resp) => {
    console.log(req.params.id);
    const file = req.files.uploadnote;
    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
        const data = new notes({
            "title": req.body.title,
            "instruction": req.body.instruction,
            "year_id":req.params.id,
            "teacher_id": req.body.teacher_id,
            "file_path": result.url

        })
        console.log(result)
        console.log(data.year_id);
        const dataSaved = await data.save();
        resp.status(200).json(dataSaved);
    })

}


exports.notesUploadAll = async (req, resp) => {
    console.log(req.params.id);
    const file = req.files.uploadnote;
    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
        const data = new notes({
            "title": req.body.title,
            "instruction": req.body.instruction,
            "year_id":req.body.year_id,
            "teacher_id": req.body.teacher_id,
            "file_path": result.url

        })
        console.log(result)
        console.log(data.year_id);
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

// exports.notesView = async (req, resp) => {
//     const data = await notes.find({year_id:req.params.id}).populate('year_id',['year']).populate('teacher_id', ['name']);
//     const newData=data.map((element,index,array)=>{
//         return element.file_path
//     })
//     resp.status(200).send(newData);
//     // resp.send(data);
//     // const imagePath = data.file_path;
//     // resp.send(imagePath);
//     // console.log(data.teacher_id.name);
//     // console.log(data.subject_id.name);
// }


exports.notesView = async (req, resp) => {
    try {
        const data = await notes.find({ year_id: req.params.id });
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





exports.notesViewAll = async (req, resp) => {
    const data = await notes.find();
    resp.status(200).send(data);
}

exports.viewSingleNote=async(req,resp)=>{
    const data=await notes.findById(req.params.id);
    resp.status(200).send(data.file_path);
}

// exports.notesViewAllPdf = async (req, resp) => {
//     const data = await notes.find();
//     resp.send(data);
//     const newData = data.map((element) => {
//         return element.file_path;
//     })
//     resp.send(newData);
// }
