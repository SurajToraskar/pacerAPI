const mongoose = require('mongoose');

const syllabusSchema = new mongoose.Schema({
    year_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "academicyears"
    },
    title: {
        type: String,
    },
    instruction: {
        type: String,
    },
    subject_id: {
        type: mongoose.Schema.ObjectId,
        // required: true,
        ref: "subjects"
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
})

const syllabusModel = mongoose.model('syllabus', syllabusSchema);
module.exports = syllabusModel;