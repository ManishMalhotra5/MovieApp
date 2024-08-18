import asyncHandler from "../utils/asyncHandler.mjs";

const uploadMovie = asyncHandler(async (req,res) =>{
    res.send("Upload a movie");
});

const deleteMovie  = asyncHandler(async (req,res) =>{
     res.send("Movie Deleted");
});

const watchMovie = asyncHandler(async (req,res)=>{
    res.send("Watching movie");
});

const downloadMovie = asyncHandler( async (req,res) =>{
    res.send("Downloading your movie");
});

export {
    uploadMovie,
    deleteMovie,
    watchMovie,
    downloadMovie
}