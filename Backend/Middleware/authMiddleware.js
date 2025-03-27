import { NextResponse } from 'next/server';

export function middleware(req) {
    const authToken = req.cookies.get('authToken') || req.headers.get('Authorization')?.replace('Bearer ', '');
    const userRole = req.cookies.get('userRole') || 'user';

    const adminRoutes = ['/admin-dashboard', '/manage-users', '/edit-route'];
    const userRoutes = ['/user-dashboard', '/profile', '/bookings'];

    if (!authToken) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (adminRoutes.includes(req.nextUrl.pathname) && userRole !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (userRoutes.includes(req.nextUrl.pathname) && userRole !== 'user') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin-dashboard', '/manage-users', '/edit-route', '/user-dashboard', '/profile', '/bookings']
};
