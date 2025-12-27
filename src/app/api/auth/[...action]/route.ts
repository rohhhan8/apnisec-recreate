import { NextRequest, NextResponse } from 'next/server';
import { AuthHandler } from '@backend/handlers/AuthHandler';
import { AuthService } from '@backend/services/AuthService';
import { UserRepository } from '@backend/repositories/UserRepository';

// Manual Dependency Injection
const userRepo = new UserRepository();
const authService = new AuthService(userRepo);
const authHandler = new AuthHandler(authService);

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ action: string[] }> }
) {
  const slug = (await params).action;
  const action = slug[0];

  if (action === 'register') {
    return authHandler.register(req);
  } else if (action === 'login') {
    return authHandler.login(req);
  } else {
    return NextResponse.json(
      { success: false, message: 'Endpoint not found' },
      { status: 404 }
    );
  }
}
