const studentdetails=require("../Models/adminModel/studentModel.js")
const jwt = require('jsonwebtoken');
const jwtSecretKey = 'YourSecretKey123';
const accountSid = "AC73cae4f4eec552fda2c0922adcc25d35";
const authToken = "a3405f4a389ff6bf1accd6f0b440b640";
const verifySid = "VA1a918d1377ac54fb8e27cbaeeb8f7500";
const client = require("twilio")(accountSid, authToken);

exports.sendOtp = async (req, res) => {
  const { phoneno } = req.body;
  try {
    const user = await studentdetails.findOne({ phoneno: phoneno });
    if (user) {
      const { phoneno } = user;
      // Send OTP via Twilio
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
    // Verify OTP via Twilio
    client.verify.v2.services(verifySid)
      .verificationChecks
      .create({ to: phoneno, code: otp })
      .then(async (verification_check) => {
        if (verification_check.status === "approved") {
           // Generate JWT token
           const token = await generateToken(phoneno);
          
           // Send the JWT token as a response
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

async function generateToken(phoneno) {
  try {
    const student = await studentdetails.findOne({ phoneno });
    if (student) {
      const payload = {
        phoneno,
        id: student._id
      };
      const token = jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' });
      return token;
    } else {
      throw new Error('Student not found');
    }
  } catch (error) {
    throw new Error('An error occurred while generating token');
  }
}



exports.getStudent = async (req, res) => {
    try {
      const { phoneno, email } = req.body;
  
      const user = await studentdetails.findOne({ phoneno, email });
      if (user) {
        const { email, phoneno } = user;
        res.json({ email, phoneno });
      } else {
        res.json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving user data' });
    }
  };

  
  