const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routes/auth')

dotenv.config()

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
app.use(express.json())
app.use("/api/auth", authRoute)


app.listen(process.env.PORT, () => {
    connectDB()
    console.log('Server running on port '+ process.env.PORT);
})

