const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    instruction: {
        type: String,
    },
    year_id:{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "academicyears"

    },
    teacher_id: {
        type: mongoose.Schema.ObjectId,
        // required: true,
        ref: "teacherdetails"
    },
    // subject_id: {
    //     type: mongoose.Schema.ObjectId,
    //     required: true,
    //     ref: "subjects"
    // },
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

const notesModel = mongoose.model('Notes', notesSchema);
module.exports = notesModel;