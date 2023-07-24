const express = require('express');
const router = express.Router();
const upload = require('../helpers/multer');
const notesController = require('../Controllers/notesController');
const reqFilter=require('../middlewares/filterYear.middleware');

router.post('/:id',reqFilter, async (req, resp) => {
    await notesController.notesUpload(req, resp);
})

router.post('/', async (req, resp) => {
    await notesController.notesUploadAll(req, resp);
})

router.delete('/:id', async (req, resp) => {
    await notesController.notesDelete(req, resp);
})

router.get('/:id',reqFilter, async (req, resp) => {
    await notesController.notesView(req, resp);
})

router.get('', async (req, resp) => {
    await notesController.notesViewAll(req, resp);
})

// router.get("/all/pdfs", async (req, resp) => {
//     await notesController.notesViewAllPdf(req, resp);
// })

router.get('/singlepdf/:id',async(req,resp)=>{
    await notesController.viewSingleNote(req,resp);
})

module.exports = router;