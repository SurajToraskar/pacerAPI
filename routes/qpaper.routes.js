const express=require('express');
const router=express.Router();
const upload=require('../helpers/multer');
const qpaperController=require('../Controllers/qpaperController');
const reqFilter=require('../middlewares/filterYear.middleware');

router.post('/:id',reqFilter,async(req,resp)=>{
    await qpaperController.QpaperUpload(req,resp);
})

router.delete('/:id',async(req,resp)=>{
    await qpaperController.QpaperDelete(req,resp);
})

router.get('',async(req,resp)=>{
    await qpaperController.viewQpaper(req,resp);
})

router.get('/singleqpaperpdf/:id',async(req,resp)=>{
    await qpaperController.viewSingleQpaper(req,resp);
})

router.get('/:id',reqFilter ,async(req,resp)=>{
    await qpaperController.viewQpaperLink(req,resp);
})


module.exports=router;