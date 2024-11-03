import mongoose from 'mongoose';

export default function dbConnect(){
  try {
    mongoose.connect(process.env.MONGODB_URI!)
    const connection=mongoose.connection
    connection.on('connected',()=>{
      console.log('connected to MongoDB');
    })
    connection.on('error',(err)=>{
      console.log('error to MongoDB connection : ', err);
      process.exit(1);
      
    })
  } catch (error) {
    console.log("something went wrong in dbConnect");
    console.log(error);

    
    
  }
}