const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const Post = require('../models/Post')
const Comment = require('../models/CommentSchema')
const verifyToken = require('../verifyToken')

// Create a new post
router.post('/create', async(req, res) => {
    try {
        const newPost = new Post(req.body)
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Update the post

router.put('/:id',verifyToken, async(req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set:req.body}, {new: true})
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Delete the post
router.delete('/:id',verifyToken, async(req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({postId:req.params.id})
        res.status(200).json("Post deleted!")
    } catch (error) {
        res.status(500).json("Error deleting post", error)
    }
})

// Get searched posts
router.get('/', async(req, res) => {
    const query = req.query
    // console.log(query);
    try {
        const searchFilter = {
            title: {$regex: query.search, $options: "i"}
        }
        const posts = await Post.find(query.search?searchFilter:null)
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json("error getting searched posts", error)
    }
})

// Get Users posts
router.get('/user/:userId', async(req, res) => {
    try {
        const posts = await Post.find({userId:req.params.userId})
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json("Error while getting users posts", error)
    }
})

// get posts details
router.get('/:id', async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json("Error getting the post details!", error)
    }
})

// get users posts
router.get('/user/:userId', async(req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json("Error getting the users post!", error)
    }
})

module.exports = router