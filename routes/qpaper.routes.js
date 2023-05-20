const express=require('express');
const router=express.Router();
const upload=require('../helpers/multer');
const qpaperController=require('../Controllers/qpaperController');

router.post('/',async(req,resp)=>{
    await qpaperController.QpaperUpload(req,resp);
})

router.delete('/:id',async(req,resp)=>{
    await qpaperController.QpaperDelete(req,resp);
})

router.get('/:id',async(req,resp)=>{
    await qpaperController.QpaperView(req,resp);
})

module.exports=router;