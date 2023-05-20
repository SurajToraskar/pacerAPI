const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
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