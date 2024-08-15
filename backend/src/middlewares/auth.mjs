import jwt, { decode } from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.mjs";
import ApiError from "../utils/ApiError.mjs";
import { User } from "../models/user.model.mjs";

const verifyJWT = asyncHandler(async (req, _, next) => {

    try {
        const token = req.cookies?.accessToken ;
        if (!token) {
            throw new ApiError( "token invalid or not found",401);
        }
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        const user = await User.findById(decodeToken?._id).select("-passcode -refreshToken");
        if (!user) {
            throw new ApiError("Unauthorized user",401);
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError("Invalid Access Token : "+error.message,401);
    }
});

export default verifyJWT;