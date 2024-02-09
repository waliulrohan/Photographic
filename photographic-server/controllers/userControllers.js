const POST = require("../models/postModel");
const USER = require("../models/userModel");

// get uesr
async function getUser(req, res) {
    try {
        const user = await USER.find({ _id: req.params.id }).select("-password")
        const post = await POST.find({ postedBy: req.params.id }).populate("postedBy", "_id name photo").populate("comments.commenter", "name photo").sort("-createdAt")
        res.status(200).json({ user, post })
    } catch {
        return res.status(404).json({ error: "User not found" })
    }

}


// follow User
async function followUser(req, res) {
    try {
        const updatedFollowedUser = await USER.findByIdAndUpdate(
            req.body.followId,
            { $push: { followers: req.user._id } },
            { new: true },
        )
        const updatedUser = await USER.findByIdAndUpdate(
            req.user._id,
            { $push: { following: req.body.followId } },
            { new: true },
            )
            res.json({user : updatedFollowedUser})
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
}


// unfollow user  
async function unfollowUser(req, res) {
    const updatedUnfollowedUser = await USER.findByIdAndUpdate(
        req.body.unfollowId,
        { $pull: { followers: req.user._id } },
        { new: true },
    );

    const updatedUser = await USER.findByIdAndUpdate(
        req.user._id,
        { $pull: { following: req.body.unfollowId } },
        { new: true },
    )

    res.json({user : updatedUnfollowedUser})

}

// upload Profile Pic
async function uploadProfilePic(req, res) {
    try {
        const user = await USER.findByIdAndUpdate(req.user._id,{
            $set: { photo : req.body.photo }
        },{ new : true });
        res.status(200).json(user);
        
    } catch (err) {
        res.status(422).json({ error: err.message });
        console.log(err);
    }

}


// remove Profile Pic
async function removeProfilePic(req, res) {
    try {
        const user = await USER.findByIdAndUpdate(req.user._id,{
            $set: { photo : 'https://res.cloudinary.com/dlaikb0id/image/upload/v1705229649/noProfile_cy0wyc.png' }
        },{ new : true });
        res.status(200).json(user);
        
    } catch (err) {
        res.status(422).json({ error: err.message });
        console.log(err);
    }

}

// search user
async function searchUser(req, res) {
    try {
        if(req.body.email){
        const emailRegex = new RegExp(req.body.email, 'i');
        const users = await USER.find({ email: emailRegex }).select("-password");
        if (users.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ users }); 
        }else{
            return res.status(404).json({ error: "please provide email" });
        }

    } catch (error) {
        console.error("Error searching for user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }

}

module.exports = {
    getUser,
    followUser,
    unfollowUser,
    uploadProfilePic,
    removeProfilePic,
    searchUser,
 
}