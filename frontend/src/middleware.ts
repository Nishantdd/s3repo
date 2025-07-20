import { NextResponse, NextRequest } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

export function middleware(request: NextRequest) {
    if (!getSessionCookie(request)) {
        return NextResponse.redirect(new URL('/login', request.url));
    } else {
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/((?!login|signup|api|_next/static|_next/image|favicon.ico).*)']
};
