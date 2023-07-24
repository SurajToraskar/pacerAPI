const express = require('express');
const router = express.Router();
const upload = require('../helpers/multer');
const resultController = require("../Controllers/resultController");
const reqFilter = require('../middlewares/filterYear.middleware');

router.post('/:id',reqFilter, async (req, resp) => {
    await resultController.uploadResult(req, resp);
})

router.post('/', async (req, resp) => {
    await resultController.uploadResultAll(req, resp);
})


router.delete('/:id', async (req, resp) => {
    await resultController.deleteResult(req, resp);
})

router.get('/singleresult/:id', async (req, resp) => {
    await resultController.viewSingleResult(req, resp);
})
router.get('/', async (req, resp) => {
    await resultController.viewAllResult(req, resp);
})

router.get('/:id', reqFilter, async (req, resp) => {
    await resultController.viewResultLinks(req, resp);
})

module.exports = router;