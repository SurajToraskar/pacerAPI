const express=require('express');
const router=express.Router();
const academicYearController=require('../Controllers/academicYearsController');

router.post('/',async(req,resp)=>{
    await academicYearController.insertAcademicYear(req,resp);
})

router.delete('/:id',async(req,resp)=>{
    await academicYearController.deleteAcademicYear(req,resp);
})

router.get('',async(req,resp)=>{
    await academicYearController.viewAllAcademicYear(req,resp);
})


module.exports=router;