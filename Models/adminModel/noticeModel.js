const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    year_id: {
        type: mongoose.Schema.ObjectId,
       // required: true,
        ref: "academicyears"
    },
    title: {
        type: String,

    },
    message: {
        type: String,
    },
    filepath:{
        type:String,
   //     required:true
    },
    upload_date: {
        type: Date,
       // required: true,
        default: Date.now
    }

})

module.exports=mongoose.model('notices',noticeSchema);
