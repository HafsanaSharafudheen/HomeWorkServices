// import { Request, Response, NextFunction } from "express";
// import { verifyToken } from "../../Adapters/Security/jwtService";

// export const authMiddleware = (req: any, res: Response, next: NextFunction): void => {
//   const authHeader = req.headers.authorization;

//   console.log('Authorization header:', authHeader);

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     res.status(401).json({ message: "Unauthorized: No token provided" });
//     return;
//   }


//   verifyToken(req, res, next);
// };
