const express = require('express');
const router = express.Router();
const adminProfileController = require('../Controllers/adminProfileController.js');

router.get('/:id', async (req, resp) => {
    await adminProfileController.getAdmin(req, resp);
})
module.exports = router;