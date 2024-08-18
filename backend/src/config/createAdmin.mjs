import ApiError from "../utils/ApiError.mjs";
import asyncHandler from "../utils/asyncHandler.mjs";
import { User } from "../models/user.model.mjs";
import ApiResponse from "../utils/ApiResponse.mjs";

const createAdmin = asyncHandler(async(req,res) => {
    if(!req.user){
        throw new ApiError(403,"Unauthorized request require login");
    }
    if(!req.user.isSuperAdmin){
        throw new ApiError(403,"unauthorized request require super user login");
    }

    const { email, passcode ,username} = req.body;
    if (!email) {
        throw new ApiError(402, "email is required");
    }
    if (!passcode) {
        throw new ApiError(402, "passcode is required");
    }
    if(!username){
        throw new ApiError(402,"username is required");
    }
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(403,"User with email already existed");
    }
    const user = await User.create({
        email: email,
        passcode: passcode,
        userName:username,
        isAdmin : true
    });

    return res.status(200).json(new ApiResponse(200, "Register Admin successfully"));

    
});


export default createAdmin;