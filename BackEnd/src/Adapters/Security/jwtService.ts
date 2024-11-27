import jwt, { JwtPayload } from 'jsonwebtoken';

export class JwtService {
  private secretKey: string;
  private expiresIn: string;

  constructor(secretKey: string, expiresIn: string) {
    this.secretKey = secretKey;
    this.expiresIn = expiresIn;
  }

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
  }

  verifyToken(token: string): JwtPayload | null {
    try {
      const payload = jwt.verify(token, this.secretKey);
      if (typeof payload === "object") {
        return payload as JwtPayload; 
      }
      return null;
    } catch (error) {
      console.error('JWT Verification Failed:', error);
      return null;
    }
  }
}
