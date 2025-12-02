import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
    '/',
    '/subjects',
    '/schedule',
    '/my-account',
];
const publicRoutes = [
    '/login',
    '/register',
]

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }
    
    const token = request.cookies.get('tokenAuthJwt')?.value;
    const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

    if (!token && isProtected) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg).*)',],
};
