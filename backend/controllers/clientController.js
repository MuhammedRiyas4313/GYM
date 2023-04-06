const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const User = require("../models/user");

const clientLogin = async (req, res) => {
  console.log(req.body,"client login calling.......");
  try {
    const { email, password } = req.body;
    const oldUser = await User.findOne({ email });
    console.log(oldUser,'olduser.....')
    if (!oldUser)
      return res.json({ status: "User doesn't exist" });

    // if (oldUser.isVerified === false)
    //   return res.json({ message: "User is not verified" });

    if (oldUser.isBlocked === true)
      return res.json({ status: "User is blocked" });

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
    console.log("user created");
    res.json({ status:'Successfully created account ✅'});
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    console.log(error);
  }
};

module.exports = {
  clientLogin,
  clientRegister,
};
