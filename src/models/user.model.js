import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema=new Schema({

},
  {timestamps:true}
);


userSchema.pre("save",async function(next)
{ if(!this.isModified(this.password)) return next();  //Why is async await used here? because hashing is a time taking process

  this.password=await bcrypt.hash(this.password,10); //These 10=salt rounds=rounds of hashing
  next();
});

userSchema.methods.isPasswordCorrect=async function(entered_password)
{return await bcrypt.compare(entered_password,this.password);}


userSchema.methods.generateAccessToken=function()
{
  return jwt.sign(
    {_id: this._id,
    email: this.email,
    username: this.username,
  fullname: this.fullname},

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
