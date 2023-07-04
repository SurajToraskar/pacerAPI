const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String },
    phoneno: { type: String }
})

module.exports = mongoose.model('admin', schema);