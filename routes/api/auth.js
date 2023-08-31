const express = require("express");
const registrationController = require("../../controllers/registrationController");
const loginController = require("../../controllers/loginController");
const forgotPasswordController = require("../../controllers/forgotPasswordController");
const matchOtpController = require("../../controllers/matchOtpController");
const resetPasswordController = require("../../controllers/resetPasswordController");
const userVerificationController = require("../../controllers/userVerificationController");
const allUsersController = require("../../controllers/allUsersController");
const deleteUserController = require("../../controllers/deleteUserController");
const _ = express.Router();

_.post("/registration", registrationController);
_.post("/userVerification", userVerificationController);
_.post("/login", loginController);
_.post("/forgotPassword", forgotPasswordController);
_.post("/matchOtp", matchOtpController);
_.post("/resetPassword", resetPasswordController);
_.get("/allUsers", allUsersController);
_.delete("/deleteUser/:id", deleteUserController);

module.exports = _;
