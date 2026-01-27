// import mongoose from "mongoose"
// import express from "express"
// import {DB_NAME} from "./constants.js"

// require('dotenv').config({path:'./env'})  //completely ok but inconsistent because we use import elsewhere

import "dotenv/config";
import connectDB from "./db/database.js";
import {app} from './app.js'


console.log("ENV CHECK →",  //temporary
  process.env.CLOUDINARY_CLOUD_NAME,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET
);


connectDB()
.then(() => {
  app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
  })
})
.catch((err) => {
  console.log("MONGO db connection failed !!! ", err);
})
;


// const app = express();

// (async ()=>{
// try{
//   await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

//   app.on("error",(err)=>{
//     console.error("Failed to connect to MongoDB",err);
//     throw err;
//   })
  
//   mongoose.connection.on("error",
//     (err)=>{console.error("MongoDB connection error:",err); throw err;});

//   app.listen(process.env.PORT || 3000,()=>{
//     console.log(`Server/App is listening on port ${process.env.PORT || 3000}`);
//   });
// }
// catch(err){
// console.error("Error:",err);
// throw err;
// }
// })();