import asyncHandler from "../utils/asyncHandler.mjs";

import ApiError from "../utils/ApiError.mjs";
import { Movie } from "../models/movie.model.mjs";
import ApiResponse from "../utils/ApiResponse.mjs";
import { uploadOnCloudinary } from "../utils/cloudinary.mjs";

const uploadMovie = asyncHandler(async (req, res) => {
	if (!req.user) {
		throw new ApiError(403, "You need to login for this request");
	}
	if (!req.user.isAdmin) {
		throw new ApiError(403, "You are not authorized for this request");
	}
	const {
		id,
		title,
		description,
		rating,
		uri,
		genre,
		downloadLink,
		director,
		writers,
		casts,
	} = req.body;

	if (!(id && title && uri && genre)) {
		throw new ApiError(404, "Please enter the required details");
	}

	const movieAlreadyThere = await Movie.findOne({ id });
	if (movieAlreadyThere) {
		throw new ApiError(400, "Movie with id already in the database");
	}

	if (!req.file) {
		throw new ApiError(404, "Thumbnail is missing");
	}

	const localFilePath = req.file.path;

	if (!localFilePath) {
		throw new ApiError(500, "Failed to load the Thumbnail");
	}

	const thumbnail = await uploadOnCloudinary(localFilePath);

	if (!thumbnail) {
		throw new ApiError(500, "Failed to upload on cloud");
	}

	const movie = await Movie.create({
		id: id,
		title: title,
		description: description,
		rating: rating,
		uri: uri,
		thumbnail: thumbnail,
		genre: genre,
		downloadLink: downloadLink,
		writers: writers || [],
		casts: casts || [],
	});

	if (!movie) {
		throw new ApiError(500, "Failed to store in database");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, {}, "successfully upload the movie"));
});

const deleteMovie = asyncHandler(async (req, res) => {
	if (!req.user) {
		throw new ApiError(403, "You need to login for this request");
	}
	if (!req.user.isAdmin) {
		throw new ApiError(403, "You'r not authorized for this request");
	}
	const { id } = req.params;

	if (!id) {
		throw new ApiError(404, "Please provide the appropriate Movie id");
	}

	await Movie.findOneAndDelete({ id });

	return res
		.status(200)
		.json(new ApiResponse(200, {}, "Successfully deleted the movie"));
});

const watchMovie = asyncHandler(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		throw new ApiError(404, "Please provide the appropriate Movie id");
	}

	const movie = await Movie.findOne({ id });
	if (!movie) {
		throw new ApiError(404, "Movie with the given id not found");
	}
	movie.views = movie.views + 1;
	await movie.save({ validateBeforeSave: false });
	return res.status(200).json(
		new ApiResponse(
			200,
			{
				movie,
			},
			"Movie fetched successfully"
		)
	);
});

const downloadMovie = asyncHandler(async (req, res) => {
	if (!req.user) {
		throw new ApiError(
			403,
			"You need to be subscriber in order to download a movie"
		);
	}
	const { id } = req.params;
	if (!id) {
		throw new ApiError(404, "Please provide the appropriate Movie id");
	}

	const movie = await Movie.findOne({ id });

	if (!movie) {
		throw new ApiError(404, "Movie with the given id doesn't exist");
	}

	if (!movie.downloadLink) {
		throw new ApiError(
			404,
			"Download link is not available for this movie"
		);
	}
	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				{ download: movie.downloadLink },
				"Successfully fetched movie"
			)
		);
});

const getSomeMovies = asyncHandler(async (req, res) => {
	const movies = await Movie.find().limit(20);
	if (!movies || movies.length === 0) {
		throw new ApiError(404, "No movies found");
	}
	return res
		.status(200)
		.json(
			new ApiResponse(200, { movies }, "Fetched some movies successfully")
		);
});

const review = asyncHandler(async (req, res) => {
	if (!req.user) {
		throw new ApiError(403, "You need to login for review");
	}
	const { review, rating } = req.body;

	if (!review) {
		throw new ApiError(404, "Empty review is not allowed");
	}
	const { id } = req.params;
	if (!id) {
		throw new ApiError(404, "Please provide the appropriate Movie id");
	}
	const movie = await Movie.findOne({ id });
	const newReview = {
		review: review,
		rating: rating,
		author: req.user.username,
	};

	movie.reviews.push(newReview);

	await movie.save({ validateBeforeSave: false });

	return res
		.status(200)
		.json(new ApiResponse(200, {}, "Successfully added the review"));
});

const search = asyncHandler(async (req, res) => {
	const { title, genre } = req.query;
	if (!(title || genre)) {
		throw new ApiError(404, "Please provide title or genre");
	}
	const query = {};
	if (title) {
		query.title = { $regex: title, $options: "i" }; // Case-insensitive search
	}

	if (genre) {
		query.genre = { $regex: genre, $options: "i" }; // Case-insensitive search
	}

	const movies = await Movie.find({ query });

	if (movies.length === 0) {
		throw new ApiError(404, "Movie not found");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, { movies }, "Movies fetched successfully"));
});

const addDownloadLink = asyncHandler(async (req, res) => {
	if (!req.user) {
		throw new ApiError(403, "You need to login for this request");
	}
	if (!req.user.isAdmin) {
		throw new ApiError(403, "You'r not authorized for this request");
	}
	const { id } = req.params;
	const { downloadLink } = req.body;

	if (!downloadLink) {
		throw new ApiError(404, "Download Link not found");
	}

	if (!id) {
		throw new ApiError(404, "Please provide the appropriate Movie id");
	}

	const movie = await Movie.findOneAndDelete({ id });
	movie.downloadLink = downloadLink;
	movie.save({ validateBeforeSave: false });
	return res
		.status(200)
		.json(new ApiError(200, {}, "Download link added successfully"));
});

const getTopMovies = asyncHandler(async (req, res) => {
	const topMovies = await Movie.find().sort({ rating: -1 }).limit(10);

	if (!topMovies || topMovies.length === 0) {
		throw new ApiError(404, "No top-rated movies found");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				{ topMovies },
				"Top movies fetched successfully"
			)
		);
});

const mostWatchedMovies = asyncHandler(async (req, res) => {
	const watchedMovies = await Movie.find().sort({ views: -1 }).limit(10);

	if (!watchedMovies || watchedMovies.length === 0) {
		throw new ApiError(404, "No watched movies found");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				{ watchedMovies },
				"Most-watched movies fetched successfully"
			)
		);
});

export {
	uploadMovie,
	deleteMovie,
	watchMovie,
	downloadMovie,
	getSomeMovies,
	review,
	search,
	addDownloadLink,
	getTopMovies,
	mostWatchedMovies,
};
