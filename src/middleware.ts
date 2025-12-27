import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AuthMiddleware } from './backend/security/AuthMiddleware';

export async function middleware(req: NextRequest) {
    try {
        const user = await AuthMiddleware.verify(req);

        // Add user ID to headers for downstream handlers
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set('x-user-id', user.id as string);
        // You can also pass role if needed
        requestHeaders.set('x-user-role', user.role as string);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch (error) {
        const isApi = req.nextUrl.pathname.startsWith('/api/');

        if (isApi) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        } else {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/profile/:path*',
        '/api/issues/:path*',
        '/api/users/profile/:path*',
        '/api/auth/me' // Protect the 'me' endpoint
    ],
};
