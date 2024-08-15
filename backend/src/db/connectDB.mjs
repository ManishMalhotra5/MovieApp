import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.mjs";
import { DB_NAME } from "../constants.mjs";
import ApiError from "../utils/ApiError.mjs";


const connectDB = async () =>{
   try {
     const connectionStr = `${process.env.DB_URL}/${DB_NAME}`;
     const connectionInstant = await mongoose.connect(connectionStr);
     console.log("Connected to DB " + connectionInstant.connection.host);
   } catch (error) {
    throw new ApiError("Failed to connect to Database"+error.message,500,error);
   }
}

export default connectDB;