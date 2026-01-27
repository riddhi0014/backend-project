import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadToCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//Controllers of the user routes.

//1.) Register User Controller
//STEPS:
 // get user details from frontend .
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar. 
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

const registerUser = asyncHandler(async(req,res)=>{
 
  const{username,email,password,fullName}=req.body; //taking form input

  //validation
  if([username,email,password,fullName].some((field)=>field?.trim===""))
  {
    throw new ApiError(400,"All fields are required");
  };
   //we can add many more other validations like checking if the email has the @ symbol ,etc. These validations are often written in a separate file and then used accordingly.
  
// console.log(req.body); //testing

 //check if user already exists
 const checkUserExistence= await User.findOne({
  $or:[
    {username},
    {email}
  ]
 });
 if(checkUserExistence){throw new ApiError(409,"User with given username or email already exists");}
 
// console.log(req.files); //testing

 //check for avatar image and coverImage
 const avatarLocalPath=req.files?.avatar?.[0]?.path;     //(This is OPTIONAL CHAINING)
 
 const coverImageLocalPath=req.files?.coverImage?.[0]?.path;;    //(This is OPTIONAL CHAINING) 
 //note: don't write req.files?.coverImage[0]?.path because if coverImage itself is undefined, then its [0] is not accessable. similarly for avatar also.

 if(!avatarLocalPath) {throw new ApiError(400,"Avatar image is required");}

// upload images to cloudinary

const avatar=await uploadToCloudinary(avatarLocalPath);
const coverImage=await uploadToCloudinary(coverImageLocalPath);

if (!avatar)
{throw new ApiError(400,"Avatar image upload failed");}

//create user object - create entry in db
const user=await User.create
(
  { username,
    email,
    password,
    fullName,
    avatar:avatar.url,
    coverImage: coverImage?.url || "",
    username:username.toLowerCase()
  }
)

console.log(user); //testing

const createdUser=await User.findById(user._id).select("-password -refreshToken"); //If user is created, then removing password and refresh token from response.

if(!createdUser){throw new ApiError(500,"Something went wrong while registering the user");} //if user not created

// console.log(createdUser); //testing (but no need even of testing this because response is 'createdUser' itself.see return statement below)

//if user is created then send response
return res.status(201).json(new ApiResponse(200,createdUser,"User registered successfully"));


});

export {registerUser};


//NOTE: here 'user' is the actual user created in the db,
// whereas 'createdUser' is the response received after removing password and refresh token from 'user'.