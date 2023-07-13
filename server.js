require('./Configuration/mongodbConfig/config.js');
const express = require('express');
const fileUpload = require('express-fileupload');
const assignmentRoute = require('./routes/assignment.routes.js');
const subRoute = require("./routes/subject.routes.js");
const qpaperRoute = require('./routes/qpaper.routes.js');
const notesRoute = require('./routes/notes.routes.js');
const deptRoute = require("./routes/department.routes.js");
const noticeRoute = require("./routes/notice.routes.js");
const profileRoute = require('./routes/teacherProfile.routes.js');
const feedbackRoute = require("./routes/feedback.routes.js");
const studentProfileRoute = require("./routes/studentProfile.routes.js");
const timetableRoute = require("./routes/timetable.routes.js")
const resultRoute = require("./routes/result.routes.js");
const syllabusRoute = require("./routes/syllabus.routes.js");
const technicalEventsRoute = require("./routes/technicalEvents.routes.js");
const nonTechnicalEventsRoute = require("./routes/nonTechnicalEvents.routes.js");
const culturalEventsRoute = require("./routes/culturalEvents.routes.js");
const academicYearRoute = require("./routes/academicYears.routes.js");
const authRoute = require("./routes/auth.route.js");
const attendanceRoute = require("./routes/attendance.routes.js");
const port = 8000;
const app = express();

app.use(fileUpload({
    useTempFiles: true
}));


app.use(express.json());

app.use('/assignment', assignmentRoute);
app.use('/teacherProfile', profileRoute);
app.use('/studentProfile', studentProfileRoute);
app.use('/qpaper', qpaperRoute);
app.use('/notes', notesRoute);
app.use('/dept', deptRoute);
app.use('/subject', subRoute);
app.use('/notice', noticeRoute);
app.use('/feedback', feedbackRoute);
app.use('/result', resultRoute);
app.use('/timetable', timetableRoute);
app.use('/syllabus', syllabusRoute);
app.use('/technicalEvents', technicalEventsRoute);
app.use('/nonTechnicalEvents', nonTechnicalEventsRoute);
app.use('/culturalEvents', culturalEventsRoute);
app.use('/academicYear', academicYearRoute);
app.use('/auth', authRoute);
app.use('/attendance',attendanceRoute);


app.listen(port, () => { console.log(`Listening to port ${port} `) })