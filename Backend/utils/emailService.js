const nodemailer = require("nodemailer");

const {
  SENDER_EMAIL_ADDRESS,
  EMAIL_PASSWORD,
} = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SENDER_EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

async function sendEmail({ to, subject, text }) {
  if (!SENDER_EMAIL_ADDRESS || !EMAIL_PASSWORD) {
    throw new Error("Email service is not configured. Please contact support.");
  }

  try {
    await transporter.sendMail({
      from: SENDER_EMAIL_ADDRESS,
      to,
      subject,
      text,
    });
  } catch (error) {
    throw new Error("Unable to send email right now. Please try again in a moment.");
  }
}

module.exports = {
  sendEmail,
};


