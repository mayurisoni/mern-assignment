const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const forgotPasswordController =require("../controllers/forgetPassword")
router.post("/forgotPassword", forgotPasswordController.postforgotPassword);
router.get("/resetPassword/:id/:token", forgotPasswordController.getResetPassword);
router.post("/resetPassword/:id/:token",forgotPasswordController.postResetPassword);
module.exports = router;