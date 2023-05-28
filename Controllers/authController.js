const studentdetails=require("../Models/adminModel/studentModel.js")

exports.getStudent=async(req,resp)=>{

    const data=await studentdetails.find()
    console.log(data);
    resp.send(data);
};


//get student
exports.getStudentphone=async(req,resp)=>{

    const data=await student.findById(req.params.id)
    console.log(data);
    resp.send(data);
};