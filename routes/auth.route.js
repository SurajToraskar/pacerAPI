const express = require('express');
const router = express.Router();
const authController=require('../Controllers/authController');


router.get('/',async(req,resp)=>{
    await authController.getStudent(req,resp);
})
// router.get('/:phone',async(req,resp)=>{
//     await authController.getStudentphone(req,resp);
// })

module.exports=router;