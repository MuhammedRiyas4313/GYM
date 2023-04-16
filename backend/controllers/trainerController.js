const jwt = require("jsonwebtoken");
const Trainer = require("../models/trainer");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");

cloudinary.config({
  cloud_name: "ddxqpujjv",
  api_key: 285814637664696,
  api_secret: "i8hO5c9YTp17cWXWDIIduZKlx2s",
  secure: true,
});

const trainerRegister = async (req, res) => {
  try {
    const values = req.body.values;
    const ytUrl = values.link;
    values.link = ytUrl.replace("/watch?v=", "/embed/");

    const profileImage = req.body.file1;
    const certificateImage = req.body.file2;
    const oldTrainer = await Trainer.findOne({ email: values.email });

    if (oldTrainer !== null)
      return res.json({ status: "Trainer already exists !" });

    const hashedPassword = await bcrypt.hash(values.password, 12);

    const file1 = await cloudinary.uploader.upload(profileImage, {
      folder: "TrainerProfile",
    });

    const file2 = await cloudinary.uploader.upload(certificateImage, {
      folder: "TrainerCertificate",
    });

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
      link: values.link,
    });
    res.json({ status: "Successfully created Account" });
  } catch (error) {
    console.log(error);
    res.json({ error: "Something went wrong" });
  }
};

const trainerLogin = async (req, res) => {
  console.log(req.body, "Trainer login calling.......");
  try {
    const { email, password } = req.body;
    const oldTrainer = await Trainer.findOne({ email });
    console.log(oldTrainer, "oldTrainer.....");
    if (!oldTrainer) return res.json({ status: "Trainer doesn't exist" });

    if (oldTrainer.isBlocked === true)
      return res.json({ status: "Trainer is blocked" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      oldTrainer.password
    );

    if (!isPasswordCorrect) return res.json({ status: "Invalid Credentials" });

    if (oldTrainer.isVerified === false)
      return res.json({ status: "Trainer not verified" });

    const toke = jwt.sign(
      { name: oldTrainer.fname, email: oldTrainer.email, id: oldTrainer._id },
      "ClientTokenSecret",
      { expiresIn: "5h" }
    );

    res
      .status(200)
      .json({ token: toke, status: "Login success", trainer: oldTrainer });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const trainerLoginWithGoogle = async (req, res) => {
  console.log("login with google...trainer");

  try {
    const { email, password } = req.body;
    const oldTrainer = await Trainer.findOne({ email });
    console.log(oldTrainer, "oldTrainer.....");
    if (!oldTrainer) return res.json({ status: "Trainer doesn't exist" });

    if (oldTrainer.isBlocked === true)
      return res.json({ status: "Trainer is blocked" });

    if (oldTrainer.isVerified === false)
      return res.json({ status: "Trainer not verified" });

    const toke = jwt.sign(
      { name: oldTrainer.fname, email: oldTrainer.email, id: oldTrainer._id },
      "ClientTokenSecret",
      { expiresIn: "5h" }
    );

    res
      .status(200)
      .json({ token: toke, status: "Login success", trainer: oldTrainer });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const trainerDetails = async (req,res) => {
  console.log('trainer details..trainer route')
  const { trainerId } = req.query

    const getDetails = await Trainer.findOne({_id:trainerId})
    console.log(getDetails,'trainer details from the data base......')
    res.json(getDetails)
}

module.exports = {
  trainerRegister,
  trainerLogin,
  trainerLoginWithGoogle,
  trainerDetails
};
