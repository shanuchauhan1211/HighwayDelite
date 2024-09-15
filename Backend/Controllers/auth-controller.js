import AddUserModel from "../Model/auth-model.js";
import UserotpModel from "../Model/UserVerificationOTP.js";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_EMAIL_PASSWORD,
  },
});
const CreateUser = async (req, res) => {
  const { firstname, lastname, password, email } = req.body;
  console.log(req.body);
  try {
    const NewUser = await AddUserModel.findOne({ firstname, lastname });
    if (NewUser) {
      return res.status(400).json({ message: "User Already exists." });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newAddUser = await AddUserModel.create({
      firstname,
      lastname,
      email,
      password: hashpassword,
      verified: false,
    });

   
    await sendOTP(newAddUser._id, newAddUser.email, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const sendOTP = async (_id, email, res) => {
  try {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: email,
      subject: 'Verify your Email',
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address. This OTP will expire in one hour</p>`,
    };

    
    const hashOTP = await bcrypt.hash(otp.toString(), 10);

   
    await UserotpModel.create({
      userId: _id,
      otp: hashOTP,
      createdAt: Date.now(),
      expireAt: Date.now() + 3600000, 
    });

   
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error occurred:', error);
        return res.status(500).json({ message: "Failed to send OTP", error });
      }
      console.log('Email sent:', info.response);

      
      return res.status(200).json({ data: { userId: _id, email }, message: "Verification OTP sent" });
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to send OTP", error });
  }
};



const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Email: ${email} , Password: ${password}`);
    const NewUser = await AddUserModel.findOne({ email:email });

    if (!NewUser) {
      return res.status(404).json({ message: " Invalid account NO data " });
    }
    const isPasswordCorrect = await bcrypt.compare(password, NewUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password!" });
    } else {
      const token = jwt.sign(
        {
          firstname: NewUser.firstname,
          lastname: NewUser.lastname,
          email: NewUser.email,
          id: NewUser.id,
          verified:NewUser.verified,
        },
        "test"
      );
      res.status(200).json({ result: NewUser, token });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



const verifyOtp = async (req, res) => {
  try {
    const { userId, otp} = req.body;
    console.log(`id: ${userId} , otp: ${otp}`);
    const otpUser = await UserotpModel.findOne({ userId:userId});

    
    if (!otpUser) {
      return res.status(404).json({ message: "Invalid account, no OTP data found." });
    }


    const current = Date.now();
    if (otpUser.expireAt < current) {
      return res.status(400).json({ message: "OTP has expired." });
    }

    const isOTPCorrect = await bcrypt.compare(otp, otpUser.otp);
    if (!isOTPCorrect) {
      return res.status(400).json({ message: "Incorrect OTP!" });
    }

  
    await AddUserModel.findByIdAndUpdate(userId, { verified: true });

  
    return res.status(200).json({ message: "OTP verified successfully, user is now verified." });
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};





export {
CreateUser,
  logIn,
  verifyOtp

};
