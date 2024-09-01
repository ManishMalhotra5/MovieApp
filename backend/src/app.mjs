import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:"16kb"}));
app.use(cookieParser());
app.use(cors());

import userRouter from "./routes/user.route.mjs";
import movieRouter from "./routes/movie.route.mjs";

app.use("/api/user",userRouter);
app.use("/api/movie",movieRouter);



export default app;