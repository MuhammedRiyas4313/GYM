const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const Admin = require("../models/admin");
const Trainer = require("../models/trainer");
const User = require('../models/user')


let transporter = nodemailer.createTransport({
    // true for 465, false for other ports
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_AUTHER, // generated ethereal user
      pass: process.env.NODEMAILER_AUTHER_PASSWORD, // generated ethereal password
    },
  });



const adminLogin = async (req,res) => {
     console.log(req.body , 'data from the front end admin login credential')
     try {
        const { email, password } = req.body;
        const oldAdmin = await Admin.findOne({ email });

        if (!oldAdmin)
            return res.json({ status: "Admin doesn't exist" })

        if (password !== oldAdmin.password)
            return res.json({ status: "Invalid Credentials" })

        const toke = jwt.sign({ email: oldAdmin.email, id: oldAdmin._id }, "admin_secret", { expiresIn: "5h" });

        res.status(200).json({ token: toke, status: 'Login success', admin: oldAdmin })
    } catch (error) {
        console.log(error);
        res.json({ status: 'Something went wrong' })
    }
}

const trainersList = async (req,res) =>{

    console.log(req.body,'data from the frontend')
    const trainersList = await Trainer.find({})
    console.log(trainersList,'trainers list from the database')
    res.json(trainersList);

}

const trainerBlockstatus = async (req,res) => {
    console.log(req.body, ' values from  the front end blockstatus updater')
    const { currentStatus, trainerId } = req.body;
    const response  = await Trainer.updateOne({_id:trainerId},{isBlocked:!currentStatus})
    console.log(response);
    if(response.modifiedCount > 0){
        if(currentStatus){
            res.json({message:'Trainer is Unblocked',status:false})
        }else{
            res.json({message:'Trainer is Blocked',status:true})
        }
    }
}

const notifications = async (req,res) => {

    const trainersToVerify = await Trainer.find({isVerified:false})
    console.log(trainersToVerify,' trainers to verify')
     if(trainersToVerify.length > 0 )  res.json(trainersToVerify)
   

}

const trainerDetails = async (req,res) => {
    console.log('trainerDetails is calling.....')
    const { trainerId } = req.query

    const getDetails = await Trainer.findOne({_id:trainerId})
    console.log(getDetails,'trainer details from the data base......')
    res.json(getDetails)
}

const verifyTrainer = async (req,res) => {
    const { trainerId } = req.query
     console.log('verify Trainer........')
     const updatedTrainer = await Trainer.findOneAndUpdate({_id:trainerId},{isVerified:true},{ new: true })

     console.log(updatedTrainer,'vrified trainer')
     const mailOptions = {
        from: "gymtrainersonline@gmail.com", // sender address
        to: updatedTrainer.email, // list of receivers
        subject: "GYM Fitness Center Account Verification", // Subject line
        html: `<p>Hello ${updatedTrainer.fname},</p>

        <p>We are pleased to inform you that your account has been successfully verified.</p> <p>You can now log in and access all the features and benefits of our platform.</p>
        
        <p>Thank you for your patience during the verification process.</p>
        
        <p>Best regards,</p>
        <p>GYM TRAINERS MANAGEMENT TEAM</p>`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.json({ status: "Email not send" });
        } else {
          console.log(info, "info from otpmailer");
          res.json({
            status: 'Verification email has been sent',
            message: `Verification Email has been sent to ${info.accepted[0]} !`,
            data:updatedTrainer ,
          });
        }
      });
}

const clientList = async (req,res) => {
    console.log('client list calling....')
    const usersList = await User.find({})
    res.json(usersList);
}

const clientDetails = async (req,res)=>{
    const { userId } = req.query;
    const getDetails = await User.findOne({_id:userId})
    console.log(getDetails,'user details from the data base......')
    res.json(getDetails)
}

module.exports = {
    adminLogin,
    trainersList,
    trainerBlockstatus,
    notifications,
    trainerDetails,
    verifyTrainer,
    clientList,
    clientDetails
}