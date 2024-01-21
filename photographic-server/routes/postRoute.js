const express = require("express");
const router = express.Router();




const {createPost, getAllPosts, like, unlike,addComment, deletePost, myPosts, myFollowingPosts} = require('../controllers/postControllers');
const { checkLogin } = require("../middleweres/user/checkLogin");

// get all posts
router.get("/allPosts",getAllPosts)
// create post
router.post('/createPost', checkLogin , createPost)
//like post
router.put('/like',checkLogin,like)
//unlike post
router.put("/unlike",checkLogin,unlike)
// add comment
router.put("/comment", checkLogin,addComment)
//delete post
router.post("/delete/:postId",checkLogin,deletePost)
//my posts
router.post("/myPosts" , checkLogin, myPosts )
// my following posts
router.post("/myFollowingPosts" , checkLogin, myFollowingPosts )


module.exports = router;