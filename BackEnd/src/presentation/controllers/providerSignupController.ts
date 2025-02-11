 import { Request, Response } from "express";
import createProvider from '../../application/businesslogics/createProvider'
const handleSignup = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Incoming request data:", req.body);

    const result = await createProvider.execute(req.body);
    console.log(result,"reeeeeeeeeeeeeeeeeeeeeee")
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export default { handleSignup };
