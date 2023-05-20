const express=require('express');
const router=express.Router();
const subjectController=require("../Controllers/subjectController")


router.post('/',async(req,resp)=>{
    await subjectController.addSubject(req,resp);
})

router.delete('/:id',async(req,resp)=>{
    await subjectController.deleteSubject(req,resp);
})

module.exports=router;
