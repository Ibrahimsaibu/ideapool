import mongoose from "mongoose";

const connectDb = async ()=>{
   try {
    await mongoose.connect(process.env.MONGO_URL as string)
     console.log('mongo db connected')
   } catch (error) {
    process.exit(1)
   }
}

export default connectDb