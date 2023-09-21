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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
}, {timestamps:true})

commentSchema.index({ postId: 1 }, { unique: false })
module.exports = mongoose.model("Comment", commentSchema)