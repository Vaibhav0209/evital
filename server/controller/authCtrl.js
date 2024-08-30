const connection = require("../db/conn");
const { generateOtp, otpExpiry } = require("../utils/utility");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");

exports.userSignup = async (req, res) => {
  try {
    const { name, email, dob, mobile, gender, address, password } = req.body;
    const result = validationResult(req);
    const { errors } = result;
    const otp = generateOtp();
    const otpExpire = otpExpiry();
    const hashPassword = await bcrypt.hash(password, 10);
    if (result.isEmpty()) {
      connection.query(
        `SELECT email from users where email=? AND isVerified=?`,
        [email, 1],
        (err, result) => {
          if (result?.length > 0) {
            return res.status(422).json({ message: "already sigup" });
          } else {
            connection.query(
              `SELECT email from users where email=? AND isVerified=?`,
              [email, 0],
              (err, result) => {
                if (err) {
                  return res.status(500).json({ message: err?.message });
                } else if (result?.length > 0) {
                  connection.query(
                    "UPDATE users SET otp=? , otpValidity=? WHERE email=?",
                    [otp, otpExpire, email],
                    (err, result) => {
                      if (result?.affectedRows > 1) {
                        sendMail(
                          email,
                          `your otp is ${otp} will expire in 15 minutes`,
                          "otp verification"
                        );
                        return res.status(200).json({ message: "otp sent" });
                      }
                    }
                  );
                  sendMail(
                    email,
                    `your otp is ${otp} will expire in 15 minutes`,
                    "otp verification"
                  );
                  return res.status(200).json({ message: "otp sent" });
                } else {
                  connection.query(
                    `INSERT INTO users (name,email,dob,mobile,gender,address,password,otp,otpValidity,isVerified) VALUES (?,?,?,?,?,?,?,?,?,?)`,
                    [
                      name,
                      email,
                      dob,
                      mobile,
                      gender,
                      address,
                      hashPassword,
                      otp,
                      otpExpire,
                      0,
                    ],
                    async (err, result) => {
                      if (result?.affectedRows > 0) {
                        sendMail(
                          email,
                          `your otp is ${otp} will expire in 15 minutes`,
                          "otp verification"
                        );
                        return res.status(200).json({ message: "otp sent" });
                      } else {
                        return res.status(500).json({ message: err?.message });
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    } else {
      return res.status(400).json({ message: errors[0]?.msg });
    }
  } catch (e) {
    return res.status(500).json({ message: e?.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    connection.query(
      "SELECT name FROM users WHERE email=? AND otp=? AND otpValidity>NOW()",
      [email, otp],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: err?.message });
        }
        if (result.length === 0) {
          return res
            .status(400)
            .json({ message: "Invalid OTP or OTP expired" });
        }
        connection.query(
          "UPDATE users SET isVerified=? WHERE email=?",
          [1, email],
          (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({ message: "OTP verified successfully" });
          }
        );
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};

exports.userLogin = (req, res) => {
  try {
    const { email, password } = req.body;
    const result = validationResult(req);
    const { errors } = result;

    if (!result.isEmpty()) {
      // Return if validation errors exist
      return res.status(400).json({ message: errors[0]?.msg });
    }

    connection.query(
      "SELECT id, password as hashPassword FROM users WHERE email=? AND isVerified=?",
      [email, 1],
      async (err, result) => {
        if (err) {
          return res.status(500).json({ message: err?.message });
        }

        if (result?.length === 0) {
          // If no verified user found, check if email is not verified or wrong email/password
          return connection.query(
            "SELECT email FROM users WHERE email=? AND isVerified=?",
            [email, 0],
            (err, unverifiedResult) => {
              if (err) {
                return res.status(500).json({ message: err?.message });
              }
              if (unverifiedResult?.length > 0) {
                return res
                  .status(401)
                  .json({ message: "Email has not been verified yet" });
              }
              return res
                .status(400)
                .json({ message: "Invalid email or password" });
            }
          );
        }

        // If a verified user is found, check the password
        const valid = await bcrypt.compare(password, result[0].hashPassword);
        if (!valid) {
          return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate token if password is valid
        const token = jwt.sign(
          { id: result[0].id },
          process.env.SECRET,
          { expiresIn: "1d" } // 1 day expiration
        );
        return res
          .status(200)
          .json({ message: "Logged in successfully", authToken: token });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};

exports.forgotPassword = (req, res) => {
  try {
    const { email } = req.body;
    const result = validationResult(req);
    const { errors } = result;
    if (result.isEmpty()) {
      connection.query(
        "SELECT id ,email FROM users WHERE email=?",
        [email],
        (err, result) => {
          if (err) {
            return res.status(500).json({ message: err?.message });
          } else if (result.length > 0) {
            const otp = generateOtp();
            const otpExpire = otpExpiry();
            connection.query(
              "UPDATE users SET otp=? , otpValidity=?,isVerified=? WHERE email=?",
              [otp, otpExpire, 0, email],
              (err, result) => {
                if (err) {
                  return res.status(500).json({ message: err?.message });
                } else if (result?.affectedRows > 0) {
                  sendMail(
                    email,
                    `your otp is ${otp} will expire in 15 minutes`,
                    "otp verification"
                  );
                  return res.status(200).json({ message: "otp sent" });
                } else {
                  return res.status(404).json({ message: "user not found" });
                }
              }
            );
          } else {
            return res.status(404).json({ message: "user not found" });
          }
        }
      );
    } else {
      return res.status(400).json({ message: errors[0]?.msg });
    }
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};
exports.changePassword = async (req, res) => {
  try {
    const { password, email } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const result = validationResult(req);
    const { errors } = result;
    if (result.isEmpty()) {
      connection.query(
        "UPDATE users SET password=? WHERE email=?",
        [hashPassword, email],
        (err, result) => {
          if (err) {
            return res.status(500).json({ message: error?.message });
          } else if (result?.affectedRows > 0) {
            return res
              .status(200)
              .json({ message: "password successfully changed" });
          } else {
            return res.status(400).json({ message: "password not changed" });
          }
        }
      );
    } else {
      return res.status(400).json({ message: errors[0]?.msg });
    }
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};
