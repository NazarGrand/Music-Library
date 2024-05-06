const nodemailer = require("nodemailer");

function createMailService() {
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

  async function sendActivationMail(to, link) {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Account activation on " + process.env.API_URL,
      text: "",
      html: `
                    <div>
                        <h1>To activate, follow the link</h1>
                        <a href="${link}">Click me</a>
                    </div>
                `,
    });
  }

  return {
    sendActivationMail,
  };
}

module.exports = createMailService;
