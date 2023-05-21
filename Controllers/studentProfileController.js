const cloudinary=require('../helpers/cloudinaryUpload.js')
const student=require("../Models/adminModel/studentModel.js")


exports.studentProfile = async (req,res) => {
    console.log("student")
    const file = req.files.photo;
    
    cloudinary.uploader.upload(file.tempFilePath,(err,result) => {
        const data = new student(
            {
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
        res.status(200).json(datasave);
    });
};

//get all students 
exports.getStudentImages=async(req,resp)=>{

    const data=await student.find()
    console.log(data);
    resp.send(data);
};


//get student
exports.getStudentImage=async(req,resp)=>{

    const data=await student.findById(req.params.id)
    console.log(data);
    resp.send(data);
};

// //update student
// exports.updateStudentImage=async(req,resp)=>{

//     const data=await student.findByIdAndUpdate(req.params.id)
//     console.log(data);
//     resp.send(data);
// };

//delete student 
exports.deleteStudentImage=async(req,resp)=>{

    const data=await student.findByIdAndDelete(req.params.id)
    console.log(data);
    resp.send(data);
};