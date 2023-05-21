const express=require('express');
const router=express.Router();
const timetableController=require("../Controllers/timetableController");

router.post('/',async(req,resp)=>{
    await timetableController.timetableUpload(req,resp);
})

router.delete('/:id',async(req,resp)=>{
    await timetableController.timetableDelete(req,resp);
})

router.get('/:id',async(req,resp)=>{
    await timetableController.timetableView(req,resp);
})

router.get('',async(req,resp)=>{
    await timetableController.timetableViewAll(req,resp);
})

module.exports=router;