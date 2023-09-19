const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    postId: {
        type:String,
        unique: true,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
}, {timestamps:true})

module.exports = mongoose.model("Comment", commentSchema)