const Student = require("../Models/adminModel/studentModel.js");

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
          student.averageAttendance = (student.totalPresent / student.totalClasses)*100;
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
  

  


