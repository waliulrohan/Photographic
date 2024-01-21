const { default: mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Schema =  mongoose.Schema;

const userSchema = new Schema({
    name:{
        type : String,
        required : true,
    },
    username:{
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
    },
    password:{
        type : String,
        required : true,
    },
    photo:{
        type : String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8p7GfNOdWUuoaLYF6Ous6cvnUShb3HEDpQg5vXxdgAs50fnyuOyzGmqikWsI4VMk6z24&usqp=CAU",
    },
   followers:[{type:ObjectId , ref:"USER"}],
   following:[{type:ObjectId , ref:"USER"}],
})


const USER = mongoose.model("USER",userSchema);
module.exports =  USER ;