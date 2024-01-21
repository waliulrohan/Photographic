const { default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Schema =  mongoose.Schema;

const postSchema = new Schema({
    caption:{
        type:String,
        required : true,
    },
    photo:{
        type:String,
        required : true,
    },
    likes:[{type : ObjectId , ref:"USER"}],
    comments:[{
        comment:{type : String},
        commenter: {type:ObjectId , ref:"USER"},
    }],
    postedBy:{type:ObjectId , ref:"USER"},
},{timestamps : true})

const POST = mongoose.model("POST",postSchema);
module.exports = POST ; 