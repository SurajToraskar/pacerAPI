const express=require('express');
const router=express.Router();
const departmentController=require('../Controllers/departmentController')


router.post('/',async(req,resp)=>{
    await departmentController.addDept(req,resp);
})

router.delete('/:id',async(req,resp)=>{
    await departmentController.deleteDept(req,resp);
})

module.exports=router;
