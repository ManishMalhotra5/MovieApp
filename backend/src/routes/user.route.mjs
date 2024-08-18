import { Router } from "express";
import createAdmin from "../config/createAdmin.mjs";
const router = Router();

import {deleteUser, getCurrentUser, loginUser, logoutUser, refreshAcessToken, registerUser, updatePasscode, updateUsername, updateUserName} from "../controllers/user.controller.mjs"
import verifyJWT from "../middlewares/auth.mjs";
import SuperAdminAuth from "../middlewares/SuperAdminAuth.mjs";


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/refresh-access-token").post(verifyJWT,refreshAcessToken);
router.route("/delete-account").delete(verifyJWT,deleteUser);
router.route("/get-current-user").get(verifyJWT,getCurrentUser);
router.route("/update-name").put(verifyJWT,updateUserName);
router.route("/update-passcode").put(verifyJWT,updatePasscode);
router.route("/update-username").put(verifyJWT,updateUsername)
router.route("/logout").post(verifyJWT,logoutUser);

router.route("/register-admin").post(verifyJWT,SuperAdminAuth,createAdmin);

export default router ;