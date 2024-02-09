const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");


const {getUser,followUser, unfollowUser, uploadProfilePic, removeProfilePic, searchUser} = require('../controllers/userControllers');
const { checkLogin } = require("../middleweres/user/checkLogin");

//get user profile
router.post('/:id', checkLogin,getUser)

// follow

router.put("/follow",checkLogin,followUser);

// unfollow

router.put("/unfollow",checkLogin,unfollowUser)

// upload profile pic
router.put('/uploadProfilePic' ,checkLogin, uploadProfilePic )

// remove profile pic
router.put('/removeProfilePic' ,checkLogin, removeProfilePic )

// search user 
router.post('/search/searchUser',checkLogin,searchUser)

module.exports = router;