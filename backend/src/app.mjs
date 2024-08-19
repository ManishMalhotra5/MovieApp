import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.mjs";
import movieRouter from "./routes/movie.route.mjs"


const app = express();

app.use(cookieParser());
app.use(express.json({limit:"16kb"}));
app.use(cors());

app.use("/api/user",userRouter);
app.use("/api/movie",movieRouter);

import "./config/createSuperAdmin.mjs";

export default app;