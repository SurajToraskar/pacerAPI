const dept = require('../Models/adminModel/departmentModel');


exports.addDept = async (req, resp) => {
    const data = new dept({
        "name": req.body.name,
    })

    const datasave = await data.save();
    resp.status(200).json(datasave);
}

exports.deleteDept = async (req, resp) => {
    const data = await dept.deleteOne({ _id: req.params.id })
    resp.status(200).json(data);
}

