const userModel = require("../models/users")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {

    const { username, email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email: email })
        if (existingUser) return res.status(400).json({ message: "User already exists" })

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await userModel.create({
            username: username,
            email: email,
            password: hashedPassword
        });

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, SECRET_KEY);
        res.status(201).json({ user: newUser, token: token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wron" });
    }
}

const signin = async (req, res) => {

    const { email, password } = req.body;

    try {

        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) return res.status(404).json({ message: "User does not exists" });

        const oriPass = await bcrypt.compare(password, existingUser.password);
        if (!oriPass) return res.status(400).json({ message: "Invalid Credentials" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
        res.status(200).json({ user: existingUser, token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}

module.exports = { signup, signin };