const express=require('express');
const router=express.Router();
const timetableController=require("../Controllers/timetableController");
const reqFilter=require('../middlewares/filterYear.middleware');

router.post('/:id',reqFilter,async(req,resp)=>{
    await timetableController.timetableUpload(req,resp);
})

router.post('/',reqFilter,async(req,resp)=>{
    await timetableController.timetableUploadAll(req,resp);
})


router.delete('/:id',async(req,resp)=>{
    await timetableController.timetableDelete(req,resp);
})

router.get('/singletimetable/:id',async(req,resp)=>{
    await timetableController.timetableView(req,resp);
})

router.get('',async(req,resp)=>{
    await timetableController.timetableViewAll(req,resp);
})

router.get('/:id',reqFilter,async(req,resp)=>{
    await timetableController.timetableLinks(req,resp);
})

module.exports=router;