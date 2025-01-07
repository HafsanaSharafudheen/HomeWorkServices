import { Request, Response } from "express";
import { loginUser } from "../../application/businesslogics/loginUser";
import { setJwtCookie } from "../Security/jwtCookie";
import User from '../../infrastructure/dbModels/user';
import Provider from '../../infrastructure/dbModels/serviceProvider'
import nodemailer from "nodemailer";
import * as crypto from "crypto";
import bcrypt from 'bcryptjs';

const handleLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "email and password are required." });
      return;
    }

    const userData = await loginUser(email, password);
    console.log(userData,"userdata form the logincontroller")
    setJwtCookie(userData.user.id, res);
    
    res.status(200).json(userData);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};



const forgotPassword = async (req: any, res: any): Promise<void> => {
  const { email } = req.body;
console.log('1')
  try {
    let user = await User.findOne({ email });
    let isProvider = false;

    if (!user) {
      user = await Provider.findOne({ email });
      isProvider = true;
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log('2')

    const token = crypto.randomBytes(32).toString("hex");
    console.log(token)
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    console.log('3')
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    const transporter = nodemailer.createTransport({
      //service: "Gmail",
      host: "smtp.gmail.com",
       port: 465,
      //port:587,
      secure: true,
      auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
      },
      logger: true, // Enable logging
      debug: true, // Show debug output
  });
console.log(transporter,"4",)
console.log("Frontend URL:", process.env.FRONTEND_URL);

    const mailOptions = {
      to: email,
      from: process.env.SMTP_USERNAME,
      subject: "Password Reset",
      html: `
      <p>You requested a password reset.</p>
      <p>Click <a href="${resetUrl}" target="_blank">here</a> to reset your password.</p>
      <p>The link is valid for 1 hour.</p>
    `,
        };

    console.log(mailOptions,"5")
  
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
    res.status(200).json({ message: "Password reset link sent to your email." });


  } catch (err) {
    res.status(200).json({ message: "Password reset link sent to your email." });
    res.status(500).json({ error: "Internal server error." });
  }
};



export const resetPassword = async (req: any, res: any) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
};
 export default { handleLogin,forgotPassword,resetPassword};
