import { User } from "../models/user.model.mjs";


const createSuperAdmin =  async ()=>{
    try {
        const email = process.env.EMAIL;
        const passcode = process.env.PASSCODE;
        const firstName = process.env.FIRSTNAME;
        const lastName = process.env.LASTNAME;
        const userName = process.env.USERNAME;
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

export default createSuperAdmin;