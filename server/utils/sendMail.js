const nodemailer = require("nodemailer");
require("dotenv").config();

const sendmail = (email, message, subject) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      //   console.log(info);
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendmail;
