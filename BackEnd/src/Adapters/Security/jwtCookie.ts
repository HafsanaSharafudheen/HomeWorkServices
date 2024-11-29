import { Response } from 'express';
import * as jwt from 'jsonwebtoken';

interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'strict' | 'lax' | 'none';
  maxAge: number;
}


export const setJwtCookie = (userId: string, res: Response): void => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const token = jwt.sign({ id: userId }, jwtSecret, { expiresIn: '1h' }); 

  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 
  };

  res.cookie('access_token', token, cookieOptions);
};
