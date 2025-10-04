import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    if (/^\/dev/.test(url.pathname) && process.env.NODE_ENV !== 'development') {
        return NextResponse.error();
    }
    return NextResponse.next();
}
