const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    year_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "academicyears"
    },
    title: {
        type: String,

    },
    link: {
        type: String
    },
    upload_date: {
        type: Date,
        required: true,
        default: Date.now
    }

});

const timetableModel=mongoose.model('timetables',timetableSchema);
module.exports=timetableModel;