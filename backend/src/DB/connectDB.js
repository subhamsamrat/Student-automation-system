import mongoose from 'mongoose'

const connectDB=async()=>{
   try {
    const connectionInstance=await mongoose.connect(`${process.env.DB_URI}`)
    console.log(`DataBase connected Successfully✅ !! DB HOST:${connectionInstance.connection.host}`);
    
   } catch (error) {
    console.log("ERROR !! in dataBase connection",error);
    process.exit(1);
   }
}

export default connectDB;