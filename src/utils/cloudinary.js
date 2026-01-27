
import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, 
})


const uploadToCloudinary=async (localFilePath)=>{
try{
if(!localFilePath)  throw new Error("Local file path is required");
  //uploading to cloudinary
  const response=await cloudinary.uploader.upload(localFilePath,{
    resource_type:'auto',
  });
  //file uploaded successfully

  // console.log("File uploaded to Cloudinary successfully:",response.url); //only for testing
  // return response;
 
  //deleting the local file
  fs.unlinkSync(localFilePath);
  return response;

}

catch (error) {

  console.error("Cloudinary upload error:", error); //temporary

  if (localFilePath && fs.existsSync(localFilePath)) {
    fs.unlinkSync(localFilePath);
  }
  return null;
}

}

export {uploadToCloudinary};