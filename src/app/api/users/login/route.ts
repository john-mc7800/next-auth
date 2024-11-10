import connect from "@/dbConnect/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();


export async function POST(request:NextRequest){
  try {
    const reqBody = await request.json();
    const {  email, password } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({email})
    if(!user){
      return NextResponse.json({error: 'User does not exist'},{status:400})
    }
    console.log("User exists");
    const validPassword = await bcryptjs.compare(password, user.password)

    if (!validPassword){ 
      return NextResponse.json({error: 'Check Yours Credentials'},{status:400})
    }
     const tokenDate={
      id:user._id,
      username:user.username,
      email:user.email,
     }
     const token = await jwt.sign(tokenDate, process.env.TOKEN_SECRET!,{expiresIn:'1d'})

     const response= NextResponse.json({
      message:'login successful',
      success: true
     })

     response.cookies.set('token',token),{httpOnly:true}
     return response
    

  } catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
  }
}