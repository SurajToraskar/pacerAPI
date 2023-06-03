const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    instruction: {
        type: String,
    },
    teacher_id: {
        type: mongoose.Schema.ObjectId,
        // required: true,
        ref: "teacherdetails"
    },
    subject_id: {
        type: mongoose.Schema.ObjectId,
        // required: true,
        ref: "subjects"
    },
    year_id: {
        type: mongoose.Schema.ObjectId,
        // required: true,
        ref: "academicyears"
    },
    file_path: {
        type: String,
        required: true
    },
    upload_date: {
        type: Date,
        required: true,
        default: Date.now
    }

});

const assignmentModel = mongoose.model('assignments', assignmentSchema);
module.exports = assignmentModel;