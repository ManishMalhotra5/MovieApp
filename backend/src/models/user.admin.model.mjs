import mongoose from "mongoose";

const adminSchema  = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    isAdmin : {
        type : Boolean,
        required : true,
        default : false
    }
});

export const Admin = mongoose.model("Admin",adminSchema);