const admin = require("../Models/adminModel/admin.js")

exports.getAdmin = async (req, resp) => {
    const data = await admin.findById(req.params.id);
    console.log(data);
    resp.status(200).send(data);
};