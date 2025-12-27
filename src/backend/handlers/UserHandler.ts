import { NextRequest, NextResponse } from 'next/server';
import { BaseHandler } from './BaseHandler';
import { UserService } from '../services/UserService';

export class UserHandler extends BaseHandler {
    constructor(private userService: UserService) {
        super();
    }

    async getProfile(req: NextRequest): Promise<NextResponse> {
        return this.handleWrapper(async () => {
            const userId = req.headers.get('x-user-id');
            if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

            return this.userService.getProfile(userId);
        });
    }

    async updateProfile(req: NextRequest): Promise<NextResponse> {
        return this.handleWrapper(async () => {
            const userId = req.headers.get('x-user-id');
            if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

            const body = await req.json();
            const { name, password } = body;

            // Basic validation
            if (!name && !password) {
                throw { statusCode: 400, message: 'At least one field (name or password) is required' };
            }

            if (password && password.length < 6) {
                throw { statusCode: 400, message: 'Password must be at least 6 characters' };
            }

            return this.userService.updateProfile(userId, { name, password });
        });
    }
}
