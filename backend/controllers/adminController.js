const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const Admin = require("../models/admin");

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

module.exports = {
    adminLogin,
}