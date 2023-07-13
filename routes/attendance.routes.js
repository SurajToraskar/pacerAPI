const express = require('express');
const router = express.Router();
const attendanceController = require('../Controllers/attendanceController')
const reqFilter = require('../middlewares/filterYear.middleware');

router.get("/fetchstudentlist", async (req, resp) => {
    await attendanceController.fetchStudents(req, resp);
});

router.post("/calavgandstore",async(req,resp)=>{
    await attendanceController.calAvgAttendanceAndStoreIndb(req,resp);
})

    
module.exports = router;