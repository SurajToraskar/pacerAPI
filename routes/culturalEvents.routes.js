const express=require('express');
const router=express.Router();
const culturalEventsController=require("../Controllers/culturalEventsController")


router.post("/",async(req,resp)=>{
    await culturalEventsController.culturalEventUpload(req,resp);
})

router.get("/:id",async(req,resp)=>{
    await culturalEventsController.culturalEventView(req,resp);
})

router.get("",async(req,resp)=>{
    await culturalEventsController.culturalEventViewAll(req,resp);
})

router.delete("/:id",async(req,resp)=>{
    await culturalEventsController.culturalEventDelete(req,resp);
})

module.exports=router;