import mongoose from "mongoose";

 const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:[true,'Enter a username'],
    unique:[true,'username unavailable'],
  },
  email:{
    type:String,
    required:[true,'Enter a email'],
    unique:[true,'email already in use'],
  },
  password:{
    type:String,
    required:[true,'Enter a password'],
  },
  isVarified:{
    type:Boolean,
    default:false,
  },
  isAdmin:{
    type:Boolean,
    default:false,
  },
  forgotPasswordToken:String,
  forgotPasswordExpiresToken:Date,
  verifyToken:String,
  varifyTokenExpiry:Date,
 })
  const User= mongoose.models.user || mongoose.model('user',userSchema)
  export default User;