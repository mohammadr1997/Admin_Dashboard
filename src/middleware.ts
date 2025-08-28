import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  if (pathName === '/') {
    return NextResponse.redirect(new URL('/Dashboard', request.url));
  }

  return NextResponse.next();
}
