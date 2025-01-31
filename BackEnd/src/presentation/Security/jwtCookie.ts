import { Response } from 'express';
import * as jwt from 'jsonwebtoken';

interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'strict' | 'none';
  maxAge: number;
}


export const setJwtCookie = (userId: string, res: Response): void => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const token = jwt.sign({ id: userId }, jwtSecret, { expiresIn: '10h' }); 
console.log(token,"ttttttttt")
  // const cookieOptions: CookieOptions = {
  //   httpOnly: true,
  //   secure: false,
  //   sameSite: (process.env.NODE_ENV === "production" ? "strict" : "none"),
  //   maxAge: 30 * 24 * 60 * 60 * 1000 
  // };
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: false, //process.env.NODE_ENV === 'production',
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000
  };

  res.cookie('access_token', token, cookieOptions);
};
