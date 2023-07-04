const express = require('express');
const router = express.Router();
const authController=require('../Controllers/authController.js');

router.post('/verifyOtp',async(req,resp)=>{
    await authController.verifyOtp(req,resp);
})

router.post('/sendOtp',async(req,resp)=>{
    await authController.sendOtp(req,resp);
})

router.post('/verifyOtpTeacher',async(req,resp)=>{
    await authController.verifyOtpTeacher(req,resp);
})

router.post('/sendOtpTeacher',async(req,resp)=>{
    await authController.sendOtpTeacher(req,resp);
})

router.post('/verifyOtpAdmin',async(req,resp)=>{
    await authController.verifyOtpAdmin(req,resp);
})

router.post('/sendOtpAdmin',async(req,resp)=>{
    await authController.sendOtpAdmin(req,resp);
})
module.exports=router;