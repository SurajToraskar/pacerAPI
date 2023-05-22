const express=require('express');
const router=express.Router();
const syllabusController=require("../Controllers/syllabusController");

router.post('/',async(req,resp)=>{
    await syllabusController.syllabusUpload(req,resp);
})

router.delete('/:id',async(req,resp)=>{
    await syllabusController.syllabusDelete(req,resp);
})

router.get('/:id',async(req,resp)=>{
    await syllabusController.syllabusView(req,resp);
})

router.get('',async(req,resp)=>{
    await syllabusController.syllabusViewAll(req,resp);
})


module.exports=router;