import { SignJWT, jwtVerify } from 'jose';

export class JwtService {
  private static getSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return new TextEncoder().encode(secret);
  }

  static async generateToken(payload: object): Promise<string> {
    return new SignJWT(payload as any)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d')
      .sign(this.getSecret());
  }

  static async verifyToken(token: string): Promise<any> {
    const { payload } = await jwtVerify(token, this.getSecret());
    return payload;
  }
}
