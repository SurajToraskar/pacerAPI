const express = require('express');
const router = express.Router();
const subjectController = require("../Controllers/subjectController");
const reqFilter = require('../middlewares/filterYear.middleware');


router.post('/', async (req, resp) => {
    await subjectController.addSubject(req, resp);
})

router.delete('/:id', async (req, resp) => {
    await subjectController.deleteSubject(req, resp);
})

router.get('', async (req, resp) => {
    await subjectController.viewAllSubject(req, resp);
})

router.get('/:id', reqFilter, async (req, resp) => {
    await subjectController.viewSubjectYearwise(req, resp);
})
module.exports = router;
