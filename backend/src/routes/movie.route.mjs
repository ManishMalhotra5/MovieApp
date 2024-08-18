import { Router } from "express";
import verifyJWT from "../middlewares/auth.mjs";
import AdminAuth from "../middlewares/AdminAuth.mjs";
import { deleteMovie, downloadMovie, uploadMovie, watchMovie } from "../controllers/movie.controller.mjs";

const router = Router();


router.route("/upload").post(verifyJWT,AdminAuth,uploadMovie);
router.route("/delete").delete(verifyJWT,AdminAuth,deleteMovie);
router.route("/watch").get(watchMovie);
router.route("/download").get(verifyJWT,downloadMovie);

export default router;