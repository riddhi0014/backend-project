import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";



const connectDB=
async()=>{
  try{

    const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`Connected to MongoDB successfully. DB Host=${connectionInstance.connection.host}`);

  }
  catch(err){
    console.error("Error connecting to MongoDB:",err);
    process.exit(1); // Exit process with failure
  }
}

export default connectDB;