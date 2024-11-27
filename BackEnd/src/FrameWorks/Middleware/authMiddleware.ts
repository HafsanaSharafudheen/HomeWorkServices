import { Request, Response, NextFunction } from "express";
import { JwtService } from "../../Adapters/Security/jwtService";

const jwtService = new JwtService(process.env.JWT_SECRET!, "1h"); 

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
 
  const authHeader = req.headers.authorization;
  console.log(req.headers,"requestheaders...")
console.log(authHeader,'authHeader')

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwtService.verifyToken(token);
    (req as any).user = payload;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};
