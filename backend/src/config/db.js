import mongoose from "mongoose";

export const connectDB =  async () => {
    try{    //DB CONNECTED BY MERNTUTORIAL DATABASE ON MONGODB ATLAS
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB CONNECTED SUCCESSFULLY!");
    }catch(error){
        console.log("Error connecting to mongodb! ",error);
        process.exit(1); // exit with error
    }
    
}