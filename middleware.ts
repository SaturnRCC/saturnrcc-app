import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Define which paths are protected and which are public
  const isProtectedPath = path.startsWith('/dashboard');
  const isAuthPath = path === '/login' || path === '/register';

  // Get the JWT token
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  // If the user is accessing a protected path and is not authenticated, redirect to login
  if (isProtectedPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If the user is authenticated and trying to access login/register, redirect to dashboard
  if (isAuthPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Otherwise, continue with the request
  return NextResponse.next();
}

// Define the paths this middleware should run on
export const config = {
  // match auth pages and protected pages
  matcher: ['/login', '/register', '/dashboard/:path*'],
};