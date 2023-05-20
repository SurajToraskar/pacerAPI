const express=require('express');
const router=express.Router();
const upload=require('../helpers/multer');
const assignmentController=require('../Controllers/assignmentController');


router.post('/',async(req,resp)=>{
    await assignmentController.assignmentUpload(req,resp);
})

router.delete('/:id',async(req,resp)=>{
    await assignmentController.assignmentDelete(req,resp);
})

router.get('/:id',async(req,resp)=>{
    await assignmentController.assignmentView(req,resp);
})

module.exports=router;