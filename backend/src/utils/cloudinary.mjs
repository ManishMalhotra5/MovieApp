import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fsPromise from "fs/promises";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
	try {
		if (!localFilePath) {
			console.log("Didn't found file in memory");
			return null;
		}

		const response = await cloudinary.uploader.upload(localFilePath);
		await fsPromise.unlink(localFilePath);
		return response.url;
	} catch (error) {
		console.log("Failed to upload file on cloudinary" + error);
		await fsPromise.unlink(localFilePath);
		return null;
	}
};

export { uploadOnCloudinary };
