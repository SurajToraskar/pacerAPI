const Student = require("../Models/adminModel/studentModel.js");
const XLSX = require('xlsx');



exports.fetchStudents = async (req, res) => {
    // Fetch all student names from the database
    Student.find({}, 'name')
        .then((students) => {
            const studentNames = students.map((student) => student.name);
            res.send({ studentNames });
        })
        .catch((error) => {
            console.log('Failed to fetch student names', error);
            res.status(500).send('Failed to fetch student names');
        });
};



exports.calAvgAttendanceAndStoreIndb = async (req, res) => {
    const { students } = req.body;

    try {
        for (const student of students) {
            const { name, isPresent } = student;

            // Update the average attendance for the current student in the database
            await Student.findOneAndUpdate(
                { name }, // Assuming 'name' is the unique identifier for each student
                { $inc: { totalClasses: 1, totalPresent: isPresent ? 1 : 0 } },
                { new: true }
            );
        }

        // Calculate the average attendance for each student
        const updatedStudents = await Student.find();
        updatedStudents.forEach((student) => {
            if (student.totalClasses > 0) {
                student.averageAttendance = (student.totalPresent / student.totalClasses) * 100;
            } else {
                student.averageAttendance = 0; // Set averageAttendance to 0 if totalClasses is 0
            }
            student.save();
        });

        res.status(200).json({ message: 'Average attendance updated successfully', updatedStudents });
    } catch (error) {
        console.log('Failed to update average attendance', error);
        res.status(500).json({ message: 'Failed to update average attendance' });
    }
};



exports.generateAttendanceList = async (req, res) => {
    try {
      // Fetch the students' data from the database
      const students = await Student.find({}, 'name averageAttendance');
  
      // Filter students with average attendance less than 75%
      const filteredStudents = students.filter((student) => student.averageAttendance < 75);
  
      // Prepare data for the worksheet
      const data = filteredStudents.map((student) => {
        return {
          'Student Name': student.name,
          'Average Attendance': student.averageAttendance,
        };
      });
  
      // Create a new workbook
      const workbook = XLSX.utils.book_new();
  
      // Convert the data array to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);
  
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');
  
      // Generate an XLSX file in memory
      const fileBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  
      // Set the response headers
      res.setHeader('Content-Disposition', 'attachment; filename=attendance.xlsx');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Length', fileBuffer.length);
  
      // Send the file buffer as the response
      res.send(fileBuffer);
    } catch (error) {
      console.log('Failed to generate attendance list', error);
      res.status(500).json({ message: 'Failed to generate attendance list' });
    }
  };
  
