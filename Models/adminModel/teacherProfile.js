const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneno: {
        type: Number,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    },
    department_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "departments"
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    imagepath: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('teacherdetails', schema);