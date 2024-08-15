import mongoose  from "mongoose";

const reviewSchema = new mongoose.Schema({});

export const Review = mongoose.model("Review",reviewSchema);