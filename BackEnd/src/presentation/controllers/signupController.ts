import { Request, Response } from "express";
import createUserUseCase from "../../application/businesslogics/createUser";

const handleSignup = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await createUserUseCase.execute(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    if (error.message === "Email already exists. Please use a different email.") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }  }
};

export default { handleSignup };
