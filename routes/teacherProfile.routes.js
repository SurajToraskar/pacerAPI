const express=require('express');
const router=express.Router();
const Upload=require('../helpers/multer');
const teacherProfileController=require('../Controllers/teacherProfileController');


router.post('/',async(req,resp)=>{
    await teacherProfileController.teacherProfile(req,resp);
})

// router.get('/:id',async(req,resp)=>{
//     await teacherProfileController.getTeacherImage(req,resp);
// })

router.get('/:id',async(req,resp)=>{
    await teacherProfileController.getTeacherInfo(req,resp);
})

module.exports=router;