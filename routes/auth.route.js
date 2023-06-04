const express = require('express');
const router = express.Router();
const authController=require('../Controllers/authController.js');

router.post('/verifyOtp',async(req,resp)=>{
    await authController.verifyOtp(req,resp);
})

router.post('/sendOtp',async(req,resp)=>{
    await authController.sendOtp(req,resp);
})

module.exports=router;