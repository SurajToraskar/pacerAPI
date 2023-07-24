const express = require('express');
const router = express.Router();
const noticeController = require("../Controllers/noticeController");
const reqFilter = require('../middlewares/filterYear.middleware');

router.post("/:id", async (req, resp) => {
    await noticeController.noticeUpload(req, resp);
})


router.post("/", async (req, resp) => {
    await noticeController.noticeUploadAll(req, resp);
})


router.delete('/:id', async (req, resp) => {
    await noticeController.noticeDelete(req, resp);
})

router.get('/viewsinglenotice/:id', async (req, resp) => {
    await noticeController.viewSingleNotice(req, resp);
})

router.get('', async (req, resp) => {
    await noticeController.viewAllNotice(req, resp);
})

router.get('/:id', reqFilter, async (req, resp) => {
    await noticeController.viewNoticeLinks(req, resp);
})

module.exports = router;