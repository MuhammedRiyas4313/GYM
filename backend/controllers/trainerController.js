const jwt = require("jsonwebtoken");
const Trainer = require("../models/trainer");
const Course = require("../models/course");
const User = require("../models/user");
const Message = require("../models/message");
const Conversation = require("../models/conversation");
const Admin = require("../models/admin");

const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;

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
      dob: values.dob,
      gender: values.gender,
      email: values.email,
      phone: values.phone,
      password: hashedPassword,
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

const trainerDetails = async (req, res) => {
  console.log("trainer details..trainer route");
  const { trainerId } = req.query;

  const getDetails = await Trainer.findOne({ _id: trainerId });
  console.log(getDetails, "trainer details from the data base......");
  res.json(getDetails);
};

const addCourse = async (req, res) => {
  console.log("add course is calling.....");

  try {
    const Image1 = req.body.file1;
    const Image2 = req.body.file2;
    const intVideo = req.body.filev;
    const values = req.body.values;
    const trainerId = req.body.trainerId;

    const existCourse = await Course.findOne({
      trainerId: new ObjectId(trainerId),
      status: "Active",
    });

    console.log(existCourse, "existing course....");
    if (existCourse)
      return res.json({ status: "Already have a active course !" });

    const cover1 = await cloudinary.uploader.upload(Image1, {
      folder: "CourseCover",
    });

    const cover2 = await cloudinary.uploader.upload(Image2, {
      folder: "CourseCover",
    });

    const introVideo = await cloudinary.uploader.upload(intVideo, {
      folder: "CourseIntro",
      resource_type: "video",
      chunk_size: 6000000,
    });

    await Course.create({
      coursename: values.coursename,
      trainerId: trainerId,
      charge: values.charge,
      description: values.description,
      cover1: cover1.secure_url,
      cover2: cover2.secure_url,
      introVideo: introVideo.secure_url,
      availableSlots: [
        {
          status: "free",

          slote: "05:00am-06:00am",
        },
        {
          status: "free",

          slote: "06:30am-07:30am",
        },
        {
          status: "free",

          slote: "08:00am-09:00am",
        },
        {
          status: "free",

          slote: "05:00pm-06:00pm",
        },
        {
          status: "free",

          slote: "06:30pm-07:30pm",
        },
        {
          status: "free",

          slote: "08:00pm-09:00pm",
        },
      ],
    });

    res.json({ status: "Course added successfully" });
  } catch (error) {
    console.log(error.message);

    res.json({ status: `${error.message} Something wrong !` });
  }
};

const trainerCourseList = async (req, res) => {
  try {
    const { trainerId } = req.query;
    console.log(trainerId, "trainer id from the query");
    const getCourses = await Course.find({
      trainerId: new ObjectId(trainerId),
    });
    res.json(getCourses);
  } catch (error) {
    res.json({ status: "something went wrong" });
    console.log(error.message, "error in trainerDetails client");
  }
};

const trainerClientList = async (req, res) => {
  try {
    console.log("clientList calling.....");
    const { trainerId } = req.query;
    const resp = await Course.find({
      trainerId: new ObjectId(trainerId),
    }).populate("clients.user");

    let clientArr = [];
    const mapAr = resp?.map((curr) => {
      curr.clients?.map((val) => {
        let data = {
          user: val.user,
          joined: val.joined,
          paymentStatus: val.paymentStatus,
          bookedSlote: val.bookedSlote,
          emergencyContact: val.emergencyContact,
          healthInfo: val.healthInfo,
          _id: val._id,
          coursename: curr.coursename,
          courseId: curr._id,
          status: val.status,
        };
        clientArr.push(data);
      });
    });
    res.json(clientArr);
  } catch (error) {
    res.json({ status: "something went wrong" });
    console.log(error.message, "error in trainerClient list");
  }
};

const trainerClientDetails = async (req, res) => {
  console.log("trainer client details is calling......");
  try {
    const { clientId, courseId } = req.query;
    console.log("clientId = ", clientId);
    console.log("courseId = ", courseId);

    //client details in the course collection and the  clients array of object field
    const course = await Course.findOne({ _id: new ObjectId(courseId) });
    const clientDetails = await Course.findOne(
      { "clients._id": new ObjectId(clientId) },
      { "clients.$": 1 }
    ).populate("clients.user");

    const data = {
      clientDetails,
      course,
    };

    console.log(clientDetails, "clientDetails.......");
    console.log(course, "courseDetails.......");

    res.json(data);
  } catch (error) {
    res.json({ status: "something went wrong" });
    console.log(error.message, "error in trainerClientDetails ...");
  }
};

const createConversation = async (req, res) => {
  console.log("trainer conversation creation calling..");
  const { trainerId, clientId } = req.body;
  try {
    let response = null;
    const conversationExist = await Conversation.findOne({
      members: {
        $all: [trainerId, clientId],
      },
    });

    if (conversationExist) {
      response = conversationExist;
      return res.json(response);
    }

    const newConv = await Conversation.create({
      members: [trainerId, clientId],
    });
    response = newConv;
    res.json(response);
  } catch (error) {
    res.json({ status: "something went wrong" });
    console.log(error.message, "error in trainerClientDetails ...");
  }
};

const getConversation = async (req, res) => {
  console.log("getconversation is calling");
  const { trainerId } = req.query;
  try {
    const conv = await Conversation.find({
      members: { $in: [trainerId] },
    }).sort({ timestamp: -1 });
    res.json(conv);
  } catch (error) {
    res.json({ status: "something went wrong" });
    console.log(error.message, "error in trainerClientDetails ...");
  }
};

const getUser = async (req, res) => {
  console.log("getUser is calling in trainercontroller.......");
  try {
    const { Id } = req.query;
    const user = await User.findOne({ _id: new ObjectId(Id) });
    if(user) return res.json(user);
    const admin = await Admin.findOne({ _id: new ObjectId(Id)})
    if(admin) return res.json(admin);
  } catch (error) {
    res.json({ status: "something went wrong" });
    console.log(error.message, "error in getuser ...");
  }
};

const getMessages = async (req, res) => {
  console.log("getMessages calling.......");
  try {
    const { conversationId } = req.query;
    const response = await Message.find({ conversationId: conversationId });
    res.json(response);
  } catch (error) {
    res.json({ status: "something went wrong" });
    console.log(error.message, "error in getuser ...");
  }
};

const createMessage = async (req, res) => {
  console.log("create message is calling....");
  const { conversationId, sender, text } = req.body;
  try {
    const response = await Message.create({
      conversationId,
      sender,
      text
    });
    res.json(response)
  } catch (error) {
    res.json({ status: "something went wrong" });
    console.log(error.message, "error in getuser ...");
  }
};

module.exports = {
  trainerRegister,
  trainerLogin,
  trainerLoginWithGoogle,
  trainerDetails,
  addCourse,
  trainerCourseList,
  trainerClientList,
  trainerClientDetails,
  createConversation,
  getConversation,
  getUser,
  getMessages,
  createMessage,
};
