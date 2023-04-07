const jwt = require('jsonwebtoken')
const Trainer = require("../models/trainer");
const cloudinary = require('cloudinary').v2
const bcrypt = require('bcrypt')

cloudinary.config({
    cloud_name: 'ddxqpujjv',
    api_key: 285814637664696 ,
    api_secret: 'i8hO5c9YTp17cWXWDIIduZKlx2s',
    secure: true
})

const trainerRegister = async (req, res) => {
    try {
        const values = req.body.values
        const ytUrl = values.link;
        values.link = ytUrl.replace('/watch?v=', '/embed/');

        const profileImage = req.body.file1
        const certificateImage = req.body.file2
        const oldTrainer = await Trainer.findOne({ email: values.email });

        if (oldTrainer !== null)
            return res.json({ status: "Trainer already exists !" })

        const hashedPassword = await bcrypt.hash(values.password, 12);

        const file1 = await cloudinary.uploader.upload(profileImage, {
            folder: "TrainerProfile"
        })

        const file2 = await cloudinary.uploader.upload(certificateImage, {
            folder: 'TrainerCertificate'
        })

        await Trainer.create({
            fname: values.fname,
            lname: values.lname,
            dob: values.dob,
            gender: values.gender,
            email: values.email,
            phone: values.phone,
            password: hashedPassword,
            coursecharge: values.charge,
            profile: file1.url,
            certificate: file2.url,
            link: values.link
        })
        res.json({ status: 'Successfully created Account' });
    } catch (error) {
        console.log(error);
        res.json({ error: 'Something went wrong' })
    }
};

module.exports = { trainerRegister } 