import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true,
    },
    description : {
        type: String,
        required : true,
    },
    rating: {
        type: Number,
    },
    movie : {
        type : String,
        required: true,
        unique : true
    },
    thumbnail : {
        type : String,
        required : true,
        unique : true
    }
});

export const Movie = mongoose.model("Movie",movieSchema);