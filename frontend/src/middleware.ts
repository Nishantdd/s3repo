import { NextResponse, NextRequest } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

export function middleware(request: NextRequest) {
    const session = getSessionCookie(request);
    const { pathname } = request.nextUrl;

    const isAuthPage = pathname === '/login' || pathname === '/signup';

    if (session) {
        if (isAuthPage)
            return NextResponse.redirect(new URL('/dashboard', request.url));
        else
            return NextResponse.next();
    } else {
        if (!isAuthPage)
            return NextResponse.redirect(new URL('/login', request.url));
        else
            return NextResponse.next();
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};