import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique : true
    },
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
    genre :{
        type: String,
        required : true,
    },
    movieURL : {
        type : String,
        required: true,
        unique : true
    },
    movieTrailer : {
        type:String,
        required : true
    },
    thumbnail : {
        type : String,
        required : true,
        unique : true
    },
    reviews : [
        {
            review : {
                type : String,
                required : true
            },
            rating : {
                type: Number,
            },
            author : {
                type: mongoose.Schema.Types.ObjectId,
                ref : User,
                required :true
            }
        }
    ]
});

export const Movie = mongoose.model("Movie",movieSchema);