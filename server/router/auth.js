const express = require("express");
const router = express.Router();
const {
  signUpValidation,
  loginValidation,
} = require("../validation/authValidation");
const {
  userSignup,
  verifyOtp,
  userLogin,
  forgotPassword,
  changePassword,
} = require("../controller/authCtrl");

router.post("/signup", signUpValidation, userSignup);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginValidation, userLogin);
router.patch("/forgot-password", loginValidation, forgotPassword);
router.patch("/change-password", loginValidation, changePassword);
module.exports = router;
