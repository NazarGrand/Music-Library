const nodemailer = require("nodemailer");

async function deliverMail(userEmail, subject, template) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: userEmail,
    subject,
    html: template,
  });
}

module.exports = { deliverMail };
