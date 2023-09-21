const express = require('express')
const router  = express.Router()
const User    = require('../models/User')
const bcrypt  = require('bcrypt')
const jwt     = require('jsonwebtoken')
const verifyToken = require('../verifyToken')


// User Registration
router.post('/register', async (req, res) => {
    try {
        const {username, password, email} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hashSync(password, salt)
        const newUser = new User({username, email, password: hashedPassword})
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        console.log("Error while registering user: " + error);
    }
})

// Login user
router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})

         if(!user){
            return res.status(404).json("User not found!")
         }

         const match = await bcrypt.compare(req.body.password, user.password)

         if(!match){
            return res.status(401).json("Invalid password!")
         }

         const token  = jwt.sign({_id:user._id, username:user.username, email:user.email}, process.env.SECRET, {expiresIn: "3d"})
         const {password, ...info} = user._doc
         res.cookie("token", token).status(200).json(info)

        //  res.status(200).json(info)
    } catch (error) {
        console.log("Error while logging user", error);
    }
})

router.get("/logout", async (req, res) => {
    try {
        res.clearCookie("token", {sameSite: "none", secure: true}).status(200).send("User logged out successfully");
    } catch (error) {
        res.status(500).json(error)
    }
})

// refetch user profile
router.get("/refetch",verifyToken, (req, res) => {
    const token = req.cookies.token
    jwt.verify(token,process.env.SECRET, {}, async (err, data) => {
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
})

module.exports = router