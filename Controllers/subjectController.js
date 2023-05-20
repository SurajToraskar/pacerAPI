const subject = require('../Models/adminModel/subjectModel')


exports.addSubject = async (req, resp) => {
    const data = new subject({
        "name": req.body.name,
        "department_id": req.body.department_id,
        "teacher_id": req.body.teacher_id
    })

    const datasave = await data.save();
    resp.status(200).json(datasave);
}

exports.deleteSubject = async (req, resp) => {
    const data = await subject.deleteOne({ _id: req.params.id })
    resp.status(200).json(data);
}
