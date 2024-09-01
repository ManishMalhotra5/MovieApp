import asyncHandler from "../utils/asyncHandler.mjs";

import ApiError from "../utils/ApiError.mjs";
import { Movie } from "../models/movie.model.mjs";
import { uploadFileOnDrive } from "../googleDrive/google-drive.mjs";
import ApiResponse from "../utils/ApiResponse.mjs";

const uploadMovie = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    throw new ApiError(403, "You are not authorized for this request");
  }
  const { id, title, description, rating, movieURL, movieTrailer } = req.body;
  console.log(id, title, description, rating, movieURL, movieTrailer);
  if (!(id && title && movieURL && movieTrailer)) {
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

  const thumbnail = await uploadFileOnDrive(localFilePath);

  if (!thumbnail) {
    throw new ApiError(500, "Failed to upload on cloud");
  }

  const movie = await Movie.create({
    id: id,
    title: title,
    description: description,
    rating: rating,
    movieTrailer: movieTrailer,
    movieURL: movieURL,
    thumbnail: thumbnail,
  });

  if (!movie) {
    throw new ApiError(500, "Failed to store in database");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "successfully upload the movie"));
});

const deleteMovie = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    throw new ApiError(403, "You 'r not authorized for this request");
  }
  const { id } = req.params;

  if (!id) {
    throw new ApiError(404, "Please provide the appropriate Movie id");
  }

  await Movie.findByIdAndDelete({ id });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Successfully deleted the movie"));
});

const watchMovie = asyncHandler(async (req, res) => {
  res.send("Watching movie");
});

const downloadMovie = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(
      403,
      "You need to be subscriber in order to download a movie"
    );
  }
  console.log(req.params);
  const { id } = req.params;
  console.log(id);
  if (!id) {
    throw new ApiError(404, "Please provide the appropriate Movie id");
  }

  const movie = await Movie.findOne({ id });

  if (!movie) {
    throw new ApiError(404, "Movie with the given id doesn't exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { movie }, "Successfully fetched movie"));
});

const getSomeMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find().limit(20);
  if (!movies || movies.length === 0) {
    throw new ApiError(404, "No movies found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { movies }, "Fetched some movies successfully"));
});

export { uploadMovie, deleteMovie, watchMovie, downloadMovie, getSomeMovies };
