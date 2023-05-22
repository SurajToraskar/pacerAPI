const express=require('express');
const router=express.Router();
const nontechnicalEventsController=require("../Controllers/nonTechnicalEventsController");


router.post("/",async(req,resp)=>{
    await nontechnicalEventsController.nontechnicalEventUpload(req,resp);
})

router.get("/:id",async(req,resp)=>{
    await nontechnicalEventsController.nontechnicalEventView(req,resp);
})

router.get("",async(req,resp)=>{
    await nontechnicalEventsController.nontechnicalEventViewAll(req,resp);
})

router.delete("/:id",async(req,resp)=>{
    await nontechnicalEventsController.nontechnicalEventDelete(req,resp);
})

module.exports=router;