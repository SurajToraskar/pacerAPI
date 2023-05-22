const mongoose = require('mongoose');

const technicalEventsSchema = new mongoose.Schema({
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

module.exports = mongoose.model('technicalevents', technicalEventsSchema);