const express = require("express");
const router = express.Router();

const { createStory, deleteStory, getAllStory, myFollowingStory } = require("../controllers/storyControllers");
const { checkLogin } = require("../middleweres/user/checkLogin");



router.post("/createStory",checkLogin,createStory)
router.delete("/deleteStory",checkLogin,deleteStory)
router.get("/alStory",checkLogin,getAllStory)
router.post("/followingStory",checkLogin,myFollowingStory)


module.exports = router;