import { configDotenv } from "dotenv";
configDotenv();
import app from "./app.mjs";
import connectDB from "./db/connectDB.mjs";
import ApiError from "./utils/ApiError.mjs";

const PORT = process.env.PORT;

connectDB()
.then(()=>{
   try {
     app.listen(PORT,()=>{
         console.log("Server started at " +PORT);
     })
   } catch (error) {
    throw new ApiError("Failed to start server"+error.message , 500,error);
   }
})



