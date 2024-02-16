import express from "express";
import validate from "../Middlewares/validate.js";
import createUser from "../Controllers/createUser.js";
import loginUser from "../Controllers/loginUser.js";
import validateProfileUpdate from "../Middlewares/validateProfileUpdate.js";
import upload from "../Middlewares/verifyPic.js";
import handleErrors from "../Middlewares/handleErrors.js";
import updateProfilePic from "../Controllers/UpdateProfilePic.js";
import getProfileData from "../Controllers/getProfileData.js";

const user_router = express.Router();

//!CREATE USER
user_router.post("/signup", validate, createUser);

//! LOGIN USER
user_router.post("/login", validate, loginUser);

//!GET USER PROFILE DATA
user_router.get("/profile/:id", getProfileData);

user_router.put(
  "/update/profile-pic",
  upload.single("file"),
  validateProfileUpdate,
  updateProfilePic
);

user_router.use(handleErrors);

export default user_router;
