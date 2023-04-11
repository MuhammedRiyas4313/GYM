const jwt = require('jsonwebtoken')
const Admin = require("../models/admin");
const Trainer = require("../models/trainer");



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

module.exports = {
    adminLogin,
    trainersList,
    trainerBlockstatus,
    notifications
}