
const nodemailer = require("nodemailer");

let sendMail = async (options) => {
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.MAIL_FROM, // sender address
        to: options.to, // list of receivers
        subject: options.subject, // Subject line
        html: options.html, // html body
    });
};

module.exports = { sendMail };