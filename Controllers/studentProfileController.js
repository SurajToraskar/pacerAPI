const cloudinary = require('../helpers/cloudinaryUpload.js')
const student = require("../Models/adminModel/studentModel.js")


exports.studentProfile = async (req, resp) => {
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        const data = new student(
            {
                "year_id": req.body.year_id,
                "name": req.body.name,
                "phoneno": req.body.phoneno,
                "gender": req.body.gender,
                "birthdate": req.body.birthdate,
                "department_id": req.body.department_id,
                "email": req.body.email,
                "address": req.body.address,
                "city": req.body.city,
                "state": req.body.state,
                "pincode": req.body.pincode,
                "imagepath": result.url

            })

        const datasave = data.save();
        resp.status(200).send("student Info Add")
        // resp.send(datasave);
    });
};

//get all students 
exports.getAllStudents = async (req, resp) => {
    const data = await student.find().populate('year_id',['year']).populate('department_id',['name']);
    console.log(data);
    resp.status(200).send(data);
};


//get student
exports.getSingleStudent = async (req, resp) => {

    const data = await student.findById(req.params.id).populate('year_id',['year']).populate('department_id',['name']);
    console.log(data);
    resp.status(200).send(data);
};

exports.getStudentYearwise = async (req, resp) => {
    const data = await student.find({ year_id: req.params.id }).populate('year_id',['year']).populate('department_id',['name']);
    resp.status(200).send(data);
}

// //update student
// exports.updateStudentImage=async(req,resp)=>{

//     const data=await student.findByIdAndUpdate(req.params.id)
//     console.log(data);
//     resp.send(data);
// };

//delete student 
exports.deleteStudentImage = async (req, resp) => {

    const data = await student.findByIdAndDelete(req.params.id)
    console.log(data);
    resp.status(200).send(data);
};

exports.updateStudentInfo = async (req, resp) => {
    const data = await student.findByIdAndUpdate(req.params.id, req.body,)
    resp.status(200).send(data);
}
