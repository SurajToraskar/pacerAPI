const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    instruction:{
        type:String,
    },
    teacher_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "teacherdetails"
    },
    subject_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "subjects"
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

});

const resultModel=mongoose.model('results',resultSchema);
module.exports=resultModel;