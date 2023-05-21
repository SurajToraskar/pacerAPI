const express = require('express');
const router = express.Router();
const studentProfileController=require('../Controllers/studentProfileController');


router.post('/',async(req,resp)=>{
    await studentProfileController.studentProfile(req,resp);
})


router.get('/',async(req,resp)=>{
    await studentProfileController.getStudentImages(req,resp);
})
router.get('/:id',async(req,resp)=>{
    await studentProfileController.getStudentImage(req,resp);
})

router.delete('/:id',async(req,resp)=>{
    await studentProfileController.deleteStudentImage(req,resp);
})
module.exports=router;