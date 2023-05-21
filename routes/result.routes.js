const express=require('express');
const router=express.Router();
const upload=require('../helpers/multer');
const resultController=require("../Controllers/resultController")

router.post('/',async(req,resp)=>{
    await resultController.uploadResult(req,resp);
})

router.delete('/:id',async(req,resp)=>{
    await resultController.deleteResult(req,resp);
})

router.get('/:id',async(req,resp)=>{
    await resultController.viewResult(req,resp);
})
router.get('/',async(req,resp)=>{
    await resultController.viewAllResult(req,resp);
})

module.exports=router;