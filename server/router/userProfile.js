const express = require("express");
const {
  getUserInfo,
  changeUserInfo,
} = require("../controller/userProfileCtrl");
const { validateTokenData } = require("../middleware/authenticate");
const router = express.Router();

router.get("/get-user-information", validateTokenData, getUserInfo);
router.patch("/change-user-information", validateTokenData, changeUserInfo);
module.exports = router;
