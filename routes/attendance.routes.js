const express = require('express');
const router = express.Router();
const attendanceController = require('../Controllers/attendanceController')
const reqFilter = require('../middlewares/filterYear.middleware');

router.get("/fetchstudentlist", async (req, resp) => {
    await attendanceController.fetchStudents(req, resp);
});

router.post("/calavgattendance",async(req,resp)=>{
    await attendanceController.calAvgAttendanceAndStoreIndb(req,resp);
});

router.get("/downloadfile",async(req,resp)=>{
    await attendanceController.generateAttendanceList(req,resp);
})



module.exports = router;