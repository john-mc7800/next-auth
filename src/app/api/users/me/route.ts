import connect from "@/dbConnect/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";
connect();


export async function POST(request:NextRequest){
  //extract data from token
  const userId=await getDataFromToken(request);
  const user =await User.findOne({_id:userId}).select("-username")
  //check if there is no user
  return NextResponse.json({
    message:"user found",
    data: user,
  })
}