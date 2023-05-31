const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    year_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "academicyears"
    },
    title: {
        type: String,

    },
    description: {
        type: String,
    },
    link: {
        type: String,
        required: true,
    },
    upload_date: {
        type: Date,
        required: true,
        default: Date.now
    }

})

module.exports = mongoose.model('feedbacks', feedbackSchema);