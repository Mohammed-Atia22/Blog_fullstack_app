const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
createPost,
getAllPosts,
getPostById,
updatePost,
deletePost,
} = require("../controllers/post.controller");
const { verifyToken } = require("../middlewares/auth.middleware");


router.post("/posts", verifyToken, createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.patch("/posts/:id", verifyToken, updatePost);
router.delete("/posts/:id", verifyToken, deletePost);


module.exports = router;