const teacher=require('../Models/adminModel/teacherProfile');
const cloudinary=require('../helpers/cloudinaryUpload.js')


exports.teacherProfile= async (req, resp) => {
    const file = req.files.profilepic;
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        const data = new teacher(
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

        const datasave = await data.save();
        resp.status(200).json(datasave);
       
    });

};

// exports.getTeacherImage=async(req,resp)=>{
//     const data=await teacher.findById(req.params.id);
//     console.log(data);
//     const image_Path = data.imagepath;
//     resp.send(image_Path);
// }

exports.getTeacherInfo=async(req,resp)=>{
    const data=await teacher.findById(req.params.id).populate('department_id', ['name']);
    resp.send(data);
    console.log(data.department_id.name);
}
