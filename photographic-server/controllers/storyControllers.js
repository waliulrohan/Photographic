const STORY = require("../models/storyModal")


//create story
async function createStory (req,res){
    try{
               const { photo } = req.body;
       if (!photo) {
        return res.status(422).json({ error: "Please add your photo" })
    }else{
        const story = new STORY({
            photo,
            postedBy:req.user._id,
        })
      await story.save();
 
        res.json({
             message: "Story created successfully" ,

    })
    }
    }catch(err){
        return res.status(422).json({ error: "something went wrong while creating story",err:err })
    }

}

// delete story
async function deleteStory(req,res){
    const story = await STORY.findByIdAndDelete(req.params.storyId);
    res.send(story)
  } 
  
 // get all story 
 async function getAllStory(req,res) {
    try{
            const story = await  STORY.find().populate("postedBy", "_id name photo").sort("-createdAt");
           res.status(200).json(story)
    }catch(err){
        return res.status(422).json({ error: "Can't find story." ,err})

    }

}



  // my following story 
async function myFollowingStory(req,res) {
    try{
            const story = await  STORY.find({postedBy: {$in:req.body.following}}).populate("postedBy", "_id name photo").sort("-createdAt");
           res.status(200).json(story)
    }catch(err){
        return res.status(422).json({ error: "Can't find story." ,err})

    }

}





    
module.exports = {
createStory,
deleteStory,
getAllStory,
myFollowingStory,
}