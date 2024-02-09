const USER = require("../models/userModel");
const POST = require("../models/postModel");


// fetch all posts 
async function getAllPosts(req,res){
    let skip = req.query.skip
try{

    const posts = await POST.find().limit(10).skip(parseInt(skip)).populate("comments.commenter" , "name photo").populate("postedBy","_id name photo").sort("-createdAt")
    res.status(200).json(posts)
}catch{
        res.status(500).json({ error: "Internal Server Error" });
}

}

//create Post
async function createPost (req,res){
       const { caption, photo } = req.body;
       if (!caption || !photo) {
        return res.status(422).json({ error: "Please add all the fields" })
    }else{
        const post = new POST({
            caption,
            photo,
            postedBy: req.user._id,
        })
      await post.save();
      const posts = await POST.find().populate("postedBy","_id name photo").populate("comments.commenter" , "name photo").sort("-createdAt")
 
        res.json({
            allPosts : posts,
             message: "Post created successfully" 
    })
    }
}


// like post 

async function like(req,res){
try{
        const post = await POST.findByIdAndUpdate(req.body._id, {
        $push: { likes: req.user._id }
    }, {new :true}).populate("postedBy", "_id name photo").populate("comments.commenter" , "name photo")
    res.status(200).json(post)
}catch{
                   return res.status(422).json({ error: "Can't like this post." })
}

}


// unlike post 

async function unlike(req,res){
    try{
            const post = await POST.findByIdAndUpdate(req.body._id, {
            $pull: { likes: req.user._id }
        }, {new :true}).populate("postedBy", "_id name photo").populate("comments.commenter" , "name photo")
        res.status(200).json(post)
    }catch{
                       return res.status(422).json({ error: "Can't unlike this post." })
    }
    
    }


// add comment
async function addComment(req,res){
    const comment ={
        comment:req.body.comment,
        commenter:req.user._id,
    }

    try{
        if (comment) {
                        const post = await POST.findByIdAndUpdate(req.body._id, {
            $push: { comments:comment }
        }, {new :true}).populate("comments.commenter" , "name photo").populate("postedBy", "_id name photo")
        res.status(200).json(post)
        }

    }catch{
                       return res.status(422).json({ error: "Can't add comment." })
    }
    
    }
    

// delete post 
async function deletePost(req,res){
  const post = await POST.findByIdAndDelete(req.params.postId);
  res.send(post)
}    


// my posts 
async function myPosts(req,res) {
    try{
            const post = await  POST.find({postedBy: req.user._id}).populate("comments.commenter" , "name photo").populate("postedBy", "_id name photo").sort("-createdAt");
    res.status(200).json(post)
    }catch(err){
        return res.status(422).json({ error: "Can't find post." ,err})

    }

}

// my following posts 
async function myFollowingPosts(req,res) {
    try{
            const post = await  POST.find({postedBy: {$in:req.body.following}}).populate("comments.commenter" , "name photo").populate("postedBy", "_id name photo").sort("-createdAt");
    res.status(200).json(post)
    }catch(err){
        return res.status(422).json({ error: "Can't find post." ,err})

    }

}




    
module.exports = {
createPost,
getAllPosts,
like,
unlike,
addComment,
deletePost,
myPosts,
myFollowingPosts,
}