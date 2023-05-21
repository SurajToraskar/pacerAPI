const express=require('express');
const router=express.Router();
const Upload=require('../helpers/multer');
const teacherProfileController=require('../Controllers/teacherProfileController');


router.post('/',async(req,resp)=>{
    await teacherProfileController.teacherProfile(req,resp);
})

router.get('',async(req,resp)=>{
    await teacherProfileController.getTeacherAllInfo(req,resp);
})

router.get('/:id',async(req,resp)=>{
    await teacherProfileController.getTeacherInfo(req,resp);
})

router.delete('/:id',async(req,resp)=>{
    await teacherProfileController.deleteTeacherInfo(req,resp);
})

router.put('/:id',async(req,resp)=>{
    await teacherProfileController.updateTeacherInfo(req,resp);
})


module.exports=router;