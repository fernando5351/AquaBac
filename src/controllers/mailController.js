const { mail } = require("../../config");
const nodemailer = require("nodemailer");

class Mailer {
  constructor() {}

  sendMail(mail, message, html) {
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
    return new Promise((resolve, reject) => {
      let info = transporter.sendMail({
          from: `${mail.user}`,
          to: `${message.to}`,
          subject: message,
          html: html,
        },
        (err, info2) => {
          if (err) return reject(err);
          resolve(info2);
        }
      );
    });
  }
}

module.exports = Mailer;
