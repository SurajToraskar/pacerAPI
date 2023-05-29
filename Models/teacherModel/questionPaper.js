const mongoose = require('mongoose');

const QpaperSchema = new mongoose.Schema({
    teacher_id: {
        type: mongoose.Schema.ObjectId,
        ref: "teacherdetails"
    },
    subject_id: {
        type: mongoose.Schema.ObjectId,
        ref: "subjects"
    },
    year_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
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

const QpaperModel = mongoose.model('questionpapers', QpaperSchema);
module.exports = QpaperModel;