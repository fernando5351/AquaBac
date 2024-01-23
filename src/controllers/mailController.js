const { mail } = require("../../config");
const nodemailer = require("nodemailer");

class Mailer {
  constructor() {}

  sendMail(email, subject, html) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mail.user, // generated ethereal user
        pass: mail.password, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    let mailOptions = {
      from: mail.user,
      to: email,
      subject,
      html: html,
    };
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          reject(Error("Email not sent"));
        } else {
          resolve(info.envelope);
        }
      });
    });
  }
}

module.exports = Mailer;
