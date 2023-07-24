const express=require('express');
const router=express.Router();
const upload=require('../helpers/multer');
const assignmentController=require('../Controllers/assignmentController');
const reqFilter=require('../middlewares/filterYear.middleware');


router.post('/:id',reqFilter,async(req,resp)=>{
    await assignmentController.assignmentUpload(req,resp);
})

router.post('/',async(req,resp)=>{
    await assignmentController.assignmentUploadAll(req,resp);
})

router.delete('/:id',async(req,resp)=>{
    await assignmentController.assignmentDelete(req,resp);
})

router.get('/singleassignmentpdf/:id',async(req,resp)=>{
    await assignmentController.viewSingleAssignment(req,resp);
})

router.get('',async(req,resp)=>{
    await assignmentController.viewAssignment(req,resp);
})

router.get('/:id',reqFilter,async(req,resp)=>{
    await assignmentController.viewAssignmentLink(req,resp);
})

module.exports=router;