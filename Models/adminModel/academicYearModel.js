const mongoose = require('mongoose');

const academicYearSchema = new mongoose.Schema({
    year: {
        type: String,
        required: true
    },
    department_id: {
        type: mongoose.Schema.ObjectId,
        ref: "departments"
    }
})

module.exports = mongoose.model('academicyears', academicYearSchema);