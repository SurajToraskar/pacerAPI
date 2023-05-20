const express=require('express');
const router=express.Router();
const noticeController=require("../Controllers/noticeController");

router.post("/",async(req,resp)=>{
    await noticeController.noticeUpload(req,resp);
})

router.delete('/:id',async(req,resp)=>{
    await noticeController.noticeDelete(req,resp);
})

router.get('/:id',async(req,resp)=>{
    await noticeController.noticeView(req,resp);
})

module.exports=router;