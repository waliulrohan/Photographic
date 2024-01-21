const USER = require("../models/userModel");
const POST = require("../models/postModel");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// sign up
async function signUp(req, res) {
    try {
        const { name, username, email, password } = req.body;
        if (!name || !email || !username || !password) {
            return res.status(422).json({ error: "Please add all the fields" })
        } else {

            const duplicateUser = await USER.findOne({ $or: [{ email: email }, { username: username }] });
            if (duplicateUser) {
                return res.status(422).json({ error: "user aready exists" })
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new USER({
                name,
                username,
                email,
                password: hashedPassword,
            })
            await user.save();
            res.json({ message: "Registered successfully" })
        }

    } catch (err) {
        return res.status(500).json({ error: "Registration failed!! Pleaseeeee try again", err })
    }



}


// login
async function login(req, res) {

    try {
        const { email, password } = req.body;
        if (!email || !password) {

            return res.status(422).json({ error: "Please add email and password" })

        } else {

            const user = await USER.findOne({ email: email })
            if (!user) {
                return res.status(400).json({ error: "Invalid email or password " })
            } else {
                const isValidPassword = await bcrypt.compare(password, user.password)
                if (isValidPassword) {
                    const userObject = {
                        _id: user._id,
                        username: user.username,
                        name: user.name,
                        email: user.email,
                        photo: user.photo,
                        following: user.following,
                    }
                    const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                        expiresIn: process.env.EXPIRY
                    })

                    res.status(200).json({ ...userObject, token, message: "Successfully logged in" });

                }
                else {
                    return res.status(400).json({ error: "Invalid email or password " })
                }
            }

        }

    } catch (err) {
        return res.status(500).json({ error: "login failed!! Pleaseeeee try again", err })

    }

}



module.exports = {
    signUp,
    login,
}