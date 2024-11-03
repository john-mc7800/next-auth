import dbConnect from "@/dbConnect/dbConnect";
import User from "@/models/userModels";
import {NextRequest,NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helper/mailer";

dbConnect();
 export async function POST(requst:NextRequest){
  try {
    const reqBody=await requst.json();
    const {username,email,password}=reqBody
    // validation
    console.log(reqBody);
    const user = await User.findOne({email})
    if(user){
      return NextResponse.json({error:"user already exists"},{status:400})
    }    
    const salt =await bcryptjs.genSaltSync(10);
    const hasdedPassword= await bcryptjs.hash(password,salt)
    const newUser=new User({username,email,password:hasdedPassword})
    const savedUser=await newUser.save();
    console.log(savedUser);
    // send varification email
    await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
    NextResponse.json({
      message:"User registered successfully",
      success:true,
      savedUser
    })
    
  } catch (error:any) {
    return NextResponse.json({error: error.message},{status: 500});
    
  }

 }