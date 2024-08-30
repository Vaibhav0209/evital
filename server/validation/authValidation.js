const { body } = require("express-validator");

const signUpValidation = [
  body("email").trim().notEmpty().isEmail().withMessage("Invalid email"),
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("password greater than 8 char"),
  body("mobile")
    .trim()
    .notEmpty()
    .isNumeric()
    .isLength({ max: 10, min: 10 })
    .withMessage("Number must be 10 digit"),
];

const loginValidation = [
  body("email").trim().notEmpty().isEmail().withMessage("Invalid email"),
];

module.exports = { signUpValidation, loginValidation };
