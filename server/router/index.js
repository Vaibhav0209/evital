const { Router } = require("express");
const router = Router();
const authRouter = require("./auth");
const userProfileRouter = require("./userProfile");

router.use(authRouter);
router.use(userProfileRouter);

module.exports = router;
