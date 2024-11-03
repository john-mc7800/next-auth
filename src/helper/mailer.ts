import User from '@/models/userModels';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';


export const sendEmail= async ({email,emailType, userId}:any)=>{
  try {
    const hashedToken=await bcryptjs.hash(userId.toString(),10)
    if(emailType==="VARIFY"){
      await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,varifyTokenExpiry:Date.now()+3600000}) //3600000=1 hr time
    } else if(emailType==="RESET"){
      await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken,forgotPasswordExpiresToken:Date.now()+3600000}) //3600000=1 hr time
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "7ea3e8ac7166d9",
        pass: "8ad96dea852c7b"
      }
    });
    const mailOptions={
      from: 'usama@usama.ai', // sender address
      to: email, // list of receivers
      subject: emailType==="VERIFY"? "Verify your Email":"Reset your Password", // Subject line
      // text: "Hello world?", // plain text body
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
      or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`  // html body
    }
    const mailResponse=await transport.sendMail(mailOptions)
    return mailResponse;
  } catch (error:any) {
    throw new Error(error.message)
  }
}