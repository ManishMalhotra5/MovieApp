import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
	},
	genre: [
		{
			type: String,
			required: true,
		},
	],

	uri: {
		type: String,
		required: true,
		unique: true,
	},
	thumbnail: {
		type: String,
		required: true,
		unique: true,
	},
	downloadLink: {
		type: String,
	},
	views: {
		type: Number,
		default: 0,
	},
	reviews: [
		{
			review: {
				type: String,
				required: true,
			},
			rating: {
				type: Number,
			},
			author: {
				type: String,
				required: true,
			},
		},
	],
});

export const Movie = mongoose.model("Movie", movieSchema);
