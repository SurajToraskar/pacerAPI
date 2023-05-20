const express = require('express');
const router = express.Router();
const feedbackController = require("../Controllers/feedbackController");


router.post('/', async (req, resp) => {
    await feedbackController.feedbackUpload(req, resp);
})

router.delete('/:id', async (req, resp) => {
    await feedbackController.feedbackDelete(req, resp);
})

router.get('/:id', async (req, resp) => {
    await feedbackController.feedbackView(req, resp);
})

router.get('',async (req, resp) => {
    await feedbackController.feedbackViewAll(req,resp);
})


module.exports = router;