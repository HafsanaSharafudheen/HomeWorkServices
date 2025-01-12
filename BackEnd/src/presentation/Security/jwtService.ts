import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any; 
}

export const verifyToken = (req: AuthenticatedRequest, res: any, next: NextFunction): void => {
  const token: string | undefined = req.cookies && req.cookies.access_token;
 // console.log(req.cookies,"requestcokkies")
  if (!token) {
    return res.status(401).json({ message: "You need to login" });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: jwt.VerifyErrors | null, user?: any) => {
    if (err) {
      console.log('Token is not valid');
      return res.status(403).json({ message: "Token is not valid" });
    }
    console.log('Token verified successfully');
    req.user = user;
  //  console.log(req.user,"request user after the verifictaion")
    next();
  });
};
