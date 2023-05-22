const mongoose = require('mongoose');

const syllabusSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    instruction: {
        type: String,
    },
    file_path: {
        type: String,
        required: true
    },
    upload_date: {
        type: Date,
        required:true,
        default: Date.now
    }
})

const syllabusModel=mongoose.model('syllabus',syllabusSchema);
module.exports=syllabusModel;