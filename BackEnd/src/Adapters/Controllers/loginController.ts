import { Request, Response } from "express";
import { loginUser } from "../../UseCases/loginUser";

const handleLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
console.log(req.body,"requestbody")

    if (!email || !password) {
      res.status(400).json({ error: "email and password are required." });
      return;
    }

    const userData = await loginUser(email, password);
    console.log("UserData", userData);
    res.status(200).json(userData);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export default { handleLogin };
