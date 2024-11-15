import { Router } from "express";
import verifyJWT from "../middlewares/auth.mjs";
import AdminAuth from "../middlewares/AdminAuth.mjs";
import {
	addDownloadLink,
	deleteMovie,
	downloadMovie,
	getSomeMovies,
	getTopMovies,
	mostWatchedMovies,
	review,
	search,
	uploadMovie,
	watchMovie,
} from "../controllers/movie.controller.mjs";
import upload from "../middlewares/multer.middleware.mjs";

const router = Router();

router
	.route("/upload")
	.post(verifyJWT, AdminAuth, upload.single("thumbnail"), uploadMovie);
router.route("/delete/:id").delete(verifyJWT, AdminAuth, deleteMovie);
router.route("/watch/:id").get(watchMovie);
router.route("/download/:id").get(verifyJWT, downloadMovie);
router.route("/movies").get(getSomeMovies);
router.route("/review/:id").post(verifyJWT, review);
router.route("/search").get(search);
router
	.route("/add-download-link/:id")
	.put(verifyJWT, AdminAuth, addDownloadLink);
router.route("/top-movies").get(getTopMovies);
router.route("/most-watched-movies").get(mostWatchedMovies);

export default router;
