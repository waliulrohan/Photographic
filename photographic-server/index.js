const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")



const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute")
const postRoute = require("./routes/postRoute")
const storyRoute = require("./routes/storyRoute")


const { notFoundHandler, errorHandler } = require('./middleweres/common/errorHandler');

const connectDb = async () => {
    try {
      const connection = await mongoose.connect(process.env.MONGO_URI);
  
      console.log('Connected to photographic database ');
    } catch (error) {
      console.error('Error connecting to photographic MongoDB:', error.message);
    }
  };
  
  connectDb();


  app.get('/',(req,res)=>{
    res.send('hi')
  })

app.use("/user", userRoute)
app.use("/auth", authRoute)
app.use("/post", postRoute)
app.use("/story",storyRoute)

//404 not fount error
app.use(notFoundHandler)

//error handler
app.use(errorHandler)

const PORT = 5000;

app.listen(PORT,()=>{
    console.log('Photographic-server is running');
})