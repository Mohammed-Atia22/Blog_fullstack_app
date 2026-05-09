const Post = require("../models/post.model");

const createPost = async (req,res) => {
    try {
        const {title,description,image} = req.body;
        if(!title || !description || !image){
            return res.status(400).json({message: "All fields are required."});
        }
        const post = await Post.create({title,description,image,createdBy: req.user.id});
        return res.status(201).json({
            message: "Post created successfully.",
            post: post.toPublic(),
        });
    } catch (error) {
        console.error("CreatePost error:", error.message, error);
        return res.status(500).json({message: "Internal server error.", error: error.message});
    }
}

const getAllPosts = async (req,res) =>{
    try {
        const posts = await Post.find();
        return res.status(200).json({
            message: "Posts retrieved successfully.",
            posts: posts.map(post => post.toPublic()),
        });
    } catch (error) {
        return res.status(500).json({message: "Internal server error."});
    }
}

const getPostById = async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({message: "Post not found."});
        }
        return res.status(200).json({
            message: "Post retrieved successfully.",
            post: post.toPublic(),
        });
    } catch (error) {
        return res.status(500).json({message: "Internal server error."});
    }
}

const updatePost = async (req,res)=>{
    try {
        const {title,description,image} = req.body;
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({message: "Post not found."});
        }
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {title,description,image},
            {new: true, runValidators: true}
        );
        return res.status(200).json({
            message: "Post updated successfully.",
            post: updatedPost.toPublic(),
        });
    } catch (error) {
        return res.status(500).json({message: "Internal server error."});
    }
}

const deletePost = async (req,res)=>{
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({message: "Post not found."});
        }
        return res.status(200).json({
            message: "Post deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({message: "Internal server error."});
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
};