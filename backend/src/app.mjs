import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use(express.static(path.join(__dirname, "../public")));

import userRouter from "./routes/user.route.mjs";
import movieRouter from "./routes/movie.route.mjs";

app.use("/api/user", userRouter);
app.use("/api/movie", movieRouter);

export default app;
