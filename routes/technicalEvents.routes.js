const express=require('express');
const router=express.Router();
const technicalEventsController=require("../Controllers/technicalEventsController");


router.post("/",async(req,resp)=>{
    await technicalEventsController.technicalEventUpload(req,resp);
})

router.get("/:id",async(req,resp)=>{
    await technicalEventsController.technicalEventView(req,resp);
})

router.get("",async(req,resp)=>{
    await technicalEventsController.technicalEventViewAll(req,resp);
})

router.delete("/:id",async(req,resp)=>{
    await technicalEventsController.technicalEventDelete(req,resp);
})

module.exports=router;