import { configDotenv } from "dotenv";
configDotenv();
import app from "./app.mjs";
import connectDB from "./db/connectDB.mjs";
import ApiError from "./utils/ApiError.mjs";

const PORT = process.env.PORT;

import createSuperAdmin from "./config/createSuperAdmin.mjs"

connectDB()
.then(()=>{
   try {
     app.listen(PORT,()=>{
         console.log("Server started at " +PORT);
         createSuperAdmin();
     });
   } catch (error) {
    throw new ApiError( 500,"Failed to start server"+error.message ,error);
   }
})



