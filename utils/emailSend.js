const nodemailer = require("nodemailer");

const emailSend = async (mailTo, ...rest) => {
  const [subject, template] = rest;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "polashk199@gmail.com",
        pass: "omggidpizbjreuyp",
      },
    });

    await transporter.sendMail({
      from: "polashk199@gmail.com",
      to: mailTo,
      subject: subject,
      html: template,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = emailSend;
