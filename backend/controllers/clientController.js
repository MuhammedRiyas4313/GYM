const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
require('dotenv').config()
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
    console.log(oldUser,'olduser.....')
    if (!oldUser)
      return res.json({ status: "User doesn't exist" });

    if (oldUser.isBlocked === true)
      return res.json({ status: "User is blocked" });

    if (oldUser.isVerified === false){

      sendOtpVerification(oldUser,res)
      return res.json({ status: "User is not verified" });

    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.json({ status: "Invalid Credentials" });

    const toke = jwt.sign(
      { name: oldUser.fname, email: oldUser.email, id: oldUser._id },
      "ClientTokenSecret",
      { expiresIn: "5h" }
    );

    res
      .status(200)
      .json({ token: toke, status: "Login success", user: oldUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};


const clientLoginWithGoogle = async (req, res) => {
  console.log(req.body,"client login calling with google.......");
  try {
    const { email, password } = req.body;
    const oldUser = await User.findOne({ email });
    console.log(oldUser,'olduser.....')
    if (!oldUser)
      return res.json({ status: "User doesn't exist" });

    if (oldUser.isBlocked === true)
      return res.json({ status: "User is blocked" });

    if (oldUser.isVerified === false)
      return res.json({ status: "User is not verified" });

    const toke = jwt.sign(
      { name: oldUser.fname, email: oldUser.email, id: oldUser._id },
      "ClientTokenSecret",
      { expiresIn: "5h" }
    );

    res
      .status(200)
      .json({ token: toke, status: "Login success", user: oldUser });
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
      return res.status(200).json({ error: "User already exists !" });
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
    console.log(result,"user created");
    sendOtpVerification(result,res)
  } catch (error) {
    res.json({ status: "Something went wrong" });
    console.log(error);
  }
};


const sendOtpVerification = async (result, res) =>{
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    //hash the otp
    const saltRounds = 10

    const hashedOTP = await bcrypt.hash(otp, saltRounds);
    const newOTPVerification = new Otp({
        userId: result._id,
        otp: hashedOTP,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000
    })
    //save the otp record
    await newOTPVerification.save()

    const mailOptions = {
      from: 'gymtrainersonline@gmail.com', // sender address
      to: result.email, // list of receivers
      subject: "GYM Fitness Center Email Verification", // Subject line
      html: `<p>Enter ${otp} in the app to verify your email address and complete the sign up</p><p>This OTP <b>expires in 1 hour</b>.</p>`
    }

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log('error', error);
            res.json({ status: 'Email not send' })
        } else {
            res.json({
                status: "Verification OTP email sent !",
                data: {
                    userId: result._id,
                    email: result.email,
                }
            })
        }
    })
}
catch (error) {
    res.json({ status: 'Something went wrong' })
}
}

const clientVerifyOTP = async (req, res) => {
  try {
      const userId = req.params.id;
      let { otp } = req.body
      if (!userId || !otp) {
          res.json({ message: 'Empty otp details are not allowed' })
      } else {
          const userOTPVerificationRecords = await Otp.find({ userId });
          if (userOTPVerificationRecords.length <= 0) {
              //no records found
              res.status(200).json({ message: "Account record doesn't exist or has been verified already. Please sign up or log in" })
          } else {
              //user otp record exists
              const { expiresAt } = userOTPVerificationRecords[0]
              const hashedOTP = userOTPVerificationRecords[0].otp;

              if (expiresAt < Date.now()) {
                  //user otp record has expired
                  await Otp.deleteMany({ userId });
                  res.json({ status: "OTP has expired. Please request again." })
              } else {
                  const validOTP = await bcrypt.compare(otp, hashedOTP);

                  if (!validOTP) {
                      //supllied otp is wrong
                      res.json({ status: "Invalid OTP passed. Check your inbox." })
                  } else {
                      //success
                      await User.updateOne({ _id: userId }, { isVerified: true });
                      await Otp.deleteMany({ userId });
                      res.json({
                          status: 'User email verified successfully',
                      })
                  }
              }
          }
      }
  } catch (error) {
      console.log(error);
      res.json({ status: 'Unable to verify' })
  }
}

module.exports = {
  clientLogin,
  clientRegister,
  clientLoginWithGoogle,
  clientVerifyOTP
};
