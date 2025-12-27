import { NextRequest } from 'next/server';
import { AuthHandler } from '@backend/handlers/AuthHandler';
import { AuthService } from '@backend/services/AuthService';
import { UserRepository } from '@backend/repositories/UserRepository';

// Manual Dependency Injection
const userRepo = new UserRepository();
const authService = new AuthService(userRepo);
const authHandler = new AuthHandler(authService);

export async function GET(req: NextRequest) {
    return authHandler.getMe(req);
}
