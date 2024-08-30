const nodemailer = require("nodemailer");
require("dotenv").config();

const sendmail = (email, message, subject) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vaibhavdevaliya28@gmail.com",
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    from: "vaibhavdevaliya28@gmail.com",
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
