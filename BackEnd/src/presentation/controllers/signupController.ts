import { Request, Response } from "express";
import createUserUseCase from "../../application/businesslogics/createUser";

const handleSignup = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await createUserUseCase.execute(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export default { handleSignup };
