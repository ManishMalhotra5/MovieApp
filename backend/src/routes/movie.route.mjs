import { Router } from "express";
import verifyJWT from "../middlewares/auth.mjs";
import AdminAuth from "../middlewares/AdminAuth.mjs";
import { deleteMovie, downloadMovie, getSomeMovies, uploadMovie, watchMovie } from "../controllers/movie.controller.mjs";
import upload from "../middlewares/multer.middleware.mjs";

const router = Router();


router.route("/upload").post(verifyJWT,AdminAuth,upload.single("thumbnail"),uploadMovie);
router.route("/delete/:id").delete(verifyJWT,AdminAuth,deleteMovie);
router.route("/watch/:id").get(watchMovie);
router.route("/download/:id").get(verifyJWT,downloadMovie);
router.route("/movies").get(getSomeMovies);

export default router;