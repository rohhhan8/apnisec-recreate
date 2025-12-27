import { NextRequest } from 'next/server';
import { UserHandler } from '@/backend/handlers/UserHandler';
import { UserService } from '@/backend/services/UserService';
import { UserRepository } from '@/backend/repositories/UserRepository';

// Dependency Injection
const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userHandler = new UserHandler(userService);

export async function GET(req: NextRequest) {
    return userHandler.getProfile(req);
}

export async function PUT(req: NextRequest) {
    return userHandler.updateProfile(req);
}
