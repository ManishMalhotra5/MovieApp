import { User } from "../models/user.model.mjs";
import asyncHandler from "../utils/asyncHandler.mjs";

const createSuperAdmin =  async ()=>{
    try {
        const email = "manish21303105@gmail.com";
        const passcode = "+6284644871+";
        const firstName = "Manish";
        const lastName = "Malhotra"
        const userName = "manish.admin"
        const user = await User.findOne({email});
        if(user && user.isSuperAdmin){
            return
        }
        const SuperAdmin =  await User.create({
            email : email,
            passcode : passcode,
            firstName : firstName,
            lastName : lastName,
            userName:userName,
            isAdmin:true,
            isSuperAdmin : true
        });

        if(!SuperAdmin){
            console.log("Failed to create admin");
        }
    } catch (error) {
        console.log(error.message);
    }
}

createSuperAdmin();