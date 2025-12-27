import { NextRequest } from 'next/server';
import { JwtService } from './JwtService';

export class AuthMiddleware {
    static async verify(req: NextRequest) {
        const token = req.cookies.get('token')?.value;

        if (!token) {
            throw new Error('Token missing');
        }

        try {
            const payload = await JwtService.verifyToken(token);
            return payload;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}
