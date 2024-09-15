import mongoose from "mongoose";
import { DB_NAME } from "../constants.mjs";
import ApiError from "../utils/ApiError.mjs";


const connectDB = async () =>{
   try {
    console.log("Database connecting protocol initiated")
     const connectionStr = `${process.env.DB_URL}/${DB_NAME}`;
     const connectionInstant = await mongoose.connect(connectionStr);
     console.log("Successfully Connected to DB " + connectionInstant.connection.host);
   } catch (error) {
    throw new ApiError(500,"Failed to connect to Database"+error.message,error);
   }
}

export default connectDB;