import { NextRequest, NextResponse } from 'next/server';
import { BaseHandler } from './BaseHandler';
import { AuthService } from '../services/AuthService';
import { ApiResponse } from '../utils/ApiResponse';
import { cookies } from 'next/headers';

export class AuthHandler extends BaseHandler {
  constructor(private authService: AuthService) {
    super();
  }

  async register(req: NextRequest): Promise<NextResponse> {
    return this.handleWrapper(async () => {
      const body = await req.json();
      const { email, password, role } = body;

      // Basic validation (In real app, use Zod)
      if (!email || !password) {
        throw { statusCode: 400, message: 'Email and password are required' };
      }

      const user = await this.authService.register(email, password, role);
      return user;
    });
  }

  async login(req: NextRequest): Promise<NextResponse> {
    return this.handleWrapper(async () => {
      const body = await req.json();
      const { email, password } = body;

      if (!email || !password) {
        throw { statusCode: 400, message: 'Email and password are required' };
      }

      const { user, token } = await this.authService.login(email, password);

      // Set HTTP-Only Cookie
      (await cookies()).set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });

      return user;
    });
  }

  async getMe(req: NextRequest): Promise<NextResponse> {
    return this.handleWrapper(async () => {
      const userId = req.headers.get('x-user-id');

      if (!userId) {
        throw { statusCode: 401, message: 'Unauthorized' };
      }

      const user = await this.authService.getUserProfile(userId);
      return user;
    });
  }
}
