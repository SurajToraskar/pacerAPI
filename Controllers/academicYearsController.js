const academicYear = require("../Models/adminModel/academicYearModel");


exports.insertAcademicYear = async (req, resp) => {
    const data = new academicYear({
        "year": req.body.year,
        "department_id": req.body.department_id
    })
    const dataSaved = await data.save();
    resp.status(200).json(dataSaved);
}

exports.deleteAcademicYear = async (req, resp) => {
    const data = await academicYear.deleteOne({ _id: req.params.id });
    resp.status(200).json(data);
}

exports.viewAllAcademicYear = async (req, resp) => {
    const data = await academicYear.find().populate('department_id', ['name']);
    resp.status(200).json(data);
}