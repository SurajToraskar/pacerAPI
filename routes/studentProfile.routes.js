const express = require('express');
const router = express.Router();
const studentProfileController = require('../Controllers/studentProfileController');
const reqFilter = require('../middlewares/filterYear.middleware')


router.post('/', async (req, resp) => {
    await studentProfileController.studentProfile(req, resp);
})

router.get('/', async (req, resp) => {
    await studentProfileController.getAllStudents(req, resp);
})

router.get('/singlestudent/:id', async (req, resp) => {
    await studentProfileController.getSingleStudent(req, resp);
})

router.get('/:id', reqFilter, async (req, resp) => {
    await studentProfileController.getStudentYearwise(req, resp);
})

router.delete('/:id', async (req, resp) => {
    await studentProfileController.deleteStudentImage(req, resp);
})
module.exports = router;