const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path')
const multer = require('multer');
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')
const userRoute = require('./routes/users')


// database configuration
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connection established!");
    }catch(error){
        console.log(error);
    }
}

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    method: ["post", "put", "delete", "get"],
}

// Middlewares
dotenv.config()
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")) )
app.use(cookieParser())
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)
app.use("/api/users", userRoute)
app.use("/api/comments", commentRoute)

// Image upload
const storage = multer

app.listen(process.env.PORT, () => {
    connectDB()
    console.log('Server running on port '+ process.env.PORT);
})

