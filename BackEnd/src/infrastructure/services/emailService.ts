import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD, 
  },
});

console.log("SMTP Username:", process.env.SMTP_USERNAME);
console.log("SMTP Password:", process.env.SMTP_PASSWORD);

const sendEmail = async (to: string, subject: string, html: string): Promise<void> => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USERNAME,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;
