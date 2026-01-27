import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema=new Schema({
  username :{type:String,required:true,unique:true,trim:true,lowercase:true,index:true},

  password :{type:String,required:[true,'Password is required'],minlength:[6,'Password must be at least 6 characters long']},

  email :{type:String,required:true,unique:true,trim:true,lowercase:true},

  fullName :{type:String,required:true,trim:true,index:true},

  avatar:{type:String,     // cloudinary url
  required:[true,'Avatar is required']},

  coverImage: {
    type: String,}, // cloudinary url


  watchHistory:[{type:Schema.Types.ObjectId, ref:'Video'}],

  refreshToken:{type:String,default:""},

},
  {timestamps:true}
);


userSchema.pre("save",async function()
{ if(!this.isModified("password")) return;  //Why is async await used here? because hashing is a time taking process

  this.password=await bcrypt.hash(this.password,10); //These 10=salt rounds=rounds of hashing
  
  // next(); //don't use next here because mongoose pre hooks support promises natively
});

userSchema.methods.isPasswordCorrect=async function(entered_password)
{return await bcrypt.compare(entered_password,this.password);}


userSchema.methods.generateAccessToken=function()
{
  return jwt.sign(
    {_id: this._id,
    email: this.email,
    username: this.username,
  fullName: this.fullName},

  process.env.ACCESS_TOKEN_SECRET,

  {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}

  )
}

userSchema.methods.generateRefreshToken=function()
{
  return jwt.sign(
    {_id: this._id},

  process.env.REFRESH_TOKEN_SECRET,

  {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}

  )
}



export const User=mongoose.model("User",userSchema);
