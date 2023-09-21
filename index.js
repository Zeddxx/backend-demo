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
const verifyToken = require('./verifyToken')


// database configuration
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connection established!");
    }catch(error){
        console.log(error);
    }
}

// const corsOptions = {
//     // origin: process.env.CLIENT_URL,
//     origin: "http://localhost:5173",
//     credentials: true,
//     method: ["post", "put", "delete", "get"],
// }
// console.log(corsOptions);
// Middlewares
dotenv.config()
app.use(express.json())
// app.use(cors(corsOptions))
app.use("/images", express.static(path.join(__dirname, "/images")) )
app.use(cors({origin:"https://the-blog-beryl.vercel.app", credentials:true}))
app.use(cookieParser())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/comments",verifyToken, commentRoute)

const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null,"image1.jpg")
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    // console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})

app.listen(process.env.PORT, () => {
    connectDB()
    console.log('Server running on port '+ process.env.PORT);
})

