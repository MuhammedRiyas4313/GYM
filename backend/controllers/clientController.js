const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");
const User = require("../models/user");
const Otp = require("../models/otp");

let transporter = nodemailer.createTransport({
  // true for 465, false for other ports
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_AUTHER, // generated ethereal user
    pass: process.env.NODEMAILER_AUTHER_PASSWORD, // generated ethereal password
  },
});

const clientLogin = async (req, res) => {
  console.log("client login calling for sent email.......");
  try {
    const { email, password } = req.body;
    const oldUser = await User.findOne({ email });
    console.log(oldUser, "olduser.....");

    if (oldUser.isVerified === false) {
      sendOtpVerification(oldUser, res);
    } else {
      if (!oldUser) return res.json({ status: "User doesn't exist" });

      if (oldUser.isBlocked === true)
        return res.json({ status: "User is blocked" });

      const isPasswordCorrect = await bcrypt.compare(
        password,
        oldUser.password
      );

      if (!isPasswordCorrect)
        return res.json({ status: "Invalid Credentials" });

      const toke = jwt.sign(
        { name: oldUser.fname, email: oldUser.email, id: oldUser._id },
        "ClientTokenSecret",
        { expiresIn: "5h" }
      );

      res.json({ token: toke, status: "Login success", user: oldUser });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const clientLoginWithGoogle = async (req, res) => {
  console.log(req.body, "client login calling with google.......");
  try {
    const { email, password } = req.body;
    const oldUser = await User.findOne({ email });

    if (oldUser.isVerified === false){
      sendOtpVerification(oldUser, res);
      console.log(oldUser, "olduser.....");
    }else{
      if (!oldUser) return res.json({ status: "User doesn't exist" });

      if (oldUser.isBlocked === true)
        return res.json({ status: "User is blocked" });
      const toke = jwt.sign(
        { name: oldUser.fname, email: oldUser.email, id: oldUser._id },
        "ClientTokenSecret",
        { expiresIn: "5h" }
      );
  
      res.json({ token: toke, status: "Login success", user: oldUser });

    }

    
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const clientRegister = async (req, res) => {
  console.log(req.body, "values from the signup form ........");
  console.log("client register page  calling.......");

  const { fname, lname, dob, gender, email, phone, password, weight, height } =
    req.body;
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser ?? oldUser !== null) {
      return res.json({ status: "User already exists !" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      fname,
      lname,
      dob,
      gender,
      weight,
      height,
      email,
      phone,
      password: hashedPassword,
    });
    console.log(result, "user created");
    res.json({ status: "New account Created successfully" });
  } catch (error) {
    res.json({ status: "Something went wrong" });
    console.log(error);
  }
};

const sendOtpVerification = async (result, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    //hash the otp
    const saltRounds = 10;

    const hashedOTP = await bcrypt.hash(otp, saltRounds);
    const newOTPVerification = new Otp({
      userId: result._id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    //save the otp record
    await newOTPVerification.save();

    const mailOptions = {
      from: "gymtrainersonline@gmail.com", // sender address
      to: result.email, // list of receivers
      subject: "GYM Fitness Center Email Verification", // Subject line
      html: `<p>Enter  ${otp}  in the app to verify your email address and complete the sign up</p><p>This OTP <b>expires in 1 hour</b>.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error", error);
        res.json({ status: "Email not send" });
      } else {
        console.log(info, "info from otpmailer");
        res.json({
          status: 'User is not verified',
          message: `Verification OTP has been sent to ${info.accepted[0]} !`,
          data: {
            userId: result._id,
            email: result.email,
          },
        });
      }
    });
  } catch (error) {
    res.json({ status: "Something went wrong" });
  }
};

const clientVerifyOTP = async (req, res) => {
  try {
    const userId = req.query.userId;
    let { otp1, otp2, otp3, otp4 } = req.body;
    const otp = "" + otp1 + otp2 + otp3 + otp4;
    console.log(otp,'concatenated otp ....')
    if (!userId || !otp) {
      res.json({ message: "Empty otp details are not allowed" });
      console.log('otp empty')
    } else {
      const userOTPVerificationRecords = await Otp.find({ userId });
      if (userOTPVerificationRecords.length <= 0) {
        console.log('no records')
        //no records found
        res
          .json({
            message:
              "Account record doesn't exist or has been verified already. Please sign up or log in",
          });
      } else {
        //user otp record exists
        const { expiresAt } = userOTPVerificationRecords[userOTPVerificationRecords.length-1];
        const hashedOTP = userOTPVerificationRecords[userOTPVerificationRecords.length-1].otp;
        console.log(hashedOTP,'0 th otp.....')
        console.log(otp,'hashed password')
        if (expiresAt < Date.now()) {
          console.log('otp expired')
          //user otp record has expired
          await Otp.deleteMany({ userId });
          res.json({ status: "OTP has expired. Please request again." });
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);
          console.log(validOTP,'comparison')
          if (!validOTP) {
            console.log('otp not valid')
            //supllied otp is wrong
            res.json({ status: "Invalid OTP passed. Check your inbox." });
          } else {
            //success
            console.log('otp confirmed')
            await User.updateOne({ _id: userId }, { isVerified: true });
            await Otp.deleteMany({ userId });
            res.json({status: "User email verified successfully",});
          }
        }
      }
    }
  } catch (error) {
    console.log(error,'error in the verifiction catch block');
    res.json({ status: "Unable to verify" });
  }
};

const clientResendOTP = async (req,res)=>{

  const userId = req.query.userId;
  const oldUser = await User.findOne({ _id:userId });
  console.log(oldUser,'user find from resend otp...')
  sendOtpVerification(oldUser,res)
  
  // const userOTPVerificationRecords = await Otp.find({ userId });
  // if(userOTPVerificationRecords.length )

}

module.exports = {
  clientLogin,
  clientRegister,
  clientLoginWithGoogle,
  clientVerifyOTP,
  clientResendOTP
};
