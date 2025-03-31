import { NextResponse } from 'next/server'
 
export async function middleware(request) {
    if (
        request.nextUrl.pathname.startsWith("/_next") ||
        request.nextUrl.pathname.startsWith("/api") ||
        request.nextUrl.pathname.startsWith("/icons/") ||
        request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|ico|svg)$/) ||
        request.nextUrl.pathname.includes(".")
    ) {
        return NextResponse.next();
    } else if (request.nextUrl.pathname === "/") {
        return NextResponse.rewrite(new URL("/pages/login", request.url))
    } else if (request.nextUrl.pathname === '/raffle') {
        return NextResponse.rewrite(new URL("/pages/raffle", request.url))
    }
}
 
export const config = {
  matcher: ['/', '/raffle', '/report'],
}