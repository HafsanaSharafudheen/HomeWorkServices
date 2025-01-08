import { Request, Response } from "express";
import createUserUseCase from "../../application/businesslogics/createUser";
import sendEmail from '../../infrastructure/services/emailService';

const handleSignup = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await createUserUseCase.execute(req.body);

     const emailContent = `
      <h1>Welcome to HomeWorks</h1>
      <p>Dear ${result.fullName},</p>
      <p>Thank you for joining us! We're thrilled to have you on board.</p>
      <p>Explore our features and feel free to reach out if you need any help.</p>
      <p>Best regards,</p>
      <p>HomeWorks Team</p>
    `;
    await sendEmail(result.email, "Welcome to HomeWorks", emailContent);

    res.status(201).json({
      message: "Thank you for signing up! A welcome email has been sent to your email address.",
      user: result,
    });
  } catch (error: any) {
    if (error.message === "Email already exists. Please use a different email.") {
      res.status(400).json({ message: error.message });
    } else if (error.message === "WhatsApp number already exists. Please use a different WhatsApp number.") {
      res.status(400).json({ message: error.message });
    } else {
      console.error("Unexpected error:", error); // Log the error for debugging
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

export default { handleSignup };
