const studentdetails=require("../Models/adminModel/studentModel.js")
const teacherdetails=require("../Models/adminModel/teacherProfile.js")
const adminmodel=require("../Models/adminModel/admin.js")
const jwt = require('jsonwebtoken');
const jwtSecretKey = 'YourSecretKey123';
const accountSid = "AC97cfeec1b2ee8b79e0af30ca2d92c406";
const authToken = "b5e35a13f093d0038bb3488a0bff5c3a";
const verifySid = "VA5f4517be11abfe2ebe73dffbc58e4510";
const client = require("twilio")(accountSid, authToken);

exports.sendOtp = async (req, res) => {
  const { phoneno } = req.body;
  try {
    const user = await studentdetails.findOne({ phoneno: phoneno });
    if (user) {
      const { phoneno } = user;
      client.verify
        .v2.services(verifySid)
        .verifications.create({ to: phoneno, channel: "sms" })
        .then((verification) => {
          if (verification.status === "pending") {
            res.status(200).json({ message: "OTP sent successfully", phoneno });
          } else {
            res.status(500).json({ error: "Failed to send OTP" });
          }
        })
        .catch((error) => {
          console.error("Error sending OTP:", error);
          res.status(500).json({ error: "An error occurred while sending OTP" });
        });
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving user data" });
  }
};

exports.verifyOtp = async (req, res) => {
  const { phoneno, otp } = req.body;
  console.log(req.body);
  try {
    client.verify.v2.services(verifySid)
      .verificationChecks
      .create({ to: phoneno, code: otp })
      .then(async (verification_check) => {
        if (verification_check.status === "approved") {
           console.log('test 1');
           const token = await generateToken(studentdetails,phoneno);
           res.status(200).json({ message: "OTP verification successful", token });
        } else {
          res.status(401).json({ message: "Invalid OTP" });
        }
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ error: "An error occurred while verifying OTP" });
      });  
      
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during OTP verification" });
  }
};

async function generateToken(tbName,phoneno) {
  try {
    console.log(tbName, phoneno);
    const student = await tbName.findOne({ phoneno });
    if (student) {
      const payload = {
        phoneno,
        id: student._id
      };
      const token = jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' });
      return token;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    throw new Error('An error occurred while generating token');
  }
}

exports.sendOtpTeacher = async (req, res) => {
  const { phoneno } = req.body;
  try {
    const user = await teacherdetails.findOne({ phoneno: phoneno });
    if (user) {
      const { phoneno } = user;
      client.verify
        .v2.services(verifySid)
        .verifications.create({ to: phoneno, channel: "sms" })
        .then((verification) => {
          if (verification.status === "pending") {
            res.status(200).json({ message: "OTP sent to Teacher successfully", phoneno });
          } else {
            res.status(500).json({ error: "Failed to send Teacher OTP" });
          }
        })
        .catch((error) => {
          console.error("Error sending OTP:", error);
          res.status(500).json({ error: "An error occurred while sending OTP" });
        });
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving user data" });
  }
};

exports.verifyOtpTeacher = async (req, res) => {
  const { phoneno, otp } = req.body;
  console.log(req.body);
  try {
    client.verify.v2.services(verifySid)
      .verificationChecks
      .create({ to: phoneno, code: otp })
      .then(async (verification_check) => {
        if (verification_check.status === "approved") {
           console.log('test 1');
           const token = await generateToken(teacherdetails,phoneno);
           res.status(200).json({ message: "OTP verification successful", token });
        } else {
          res.status(401).json({ message: "Invalid OTP" });
        }
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ error: "An error occurred while verifying OTP" });
      });  
      
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during OTP verification" });
  }
};

exports.sendOtpAdmin = async (req, res) => {
  const { phoneno } = req.body;
  try {
    const user = await adminmodel.findOne({ phoneno: phoneno });
    if (user) {
      const { phoneno } = user;
      client.verify
        .v2.services(verifySid)
        .verifications.create({ to: phoneno, channel: "sms" })
        .then((verification) => {
          if (verification.status === "pending") {
            res.status(200).json({ message: "OTP sent successfully", phoneno });
          } else {
            res.status(500).json({ error: "Failed to send OTP" });
          }
        })
        .catch((error) => {
          console.error("Error sending OTP:", error);
          res.status(500).json({ error: "An error occurred while sending OTP" });
        });
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving user data" });
  }
};

exports.verifyOtpAdmin = async (req, res) => {
  const { phoneno, otp } = req.body;
  console.log(req.body);
  try {
    client.verify.v2.services(verifySid)
      .verificationChecks
      .create({ to: phoneno, code: otp })
      .then(async (verification_check) => {
        if (verification_check.status === "approved") {
           console.log('test 1');
           const token = await generateToken(adminmodel,phoneno);
           res.status(200).json({ message: "OTP verification successful", token });
        } else {
          res.status(401).json({ message: "Invalid OTP" });
        }
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ error: "An error occurred while verifying OTP" });
      });  
      
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during OTP verification" });
  }
};
