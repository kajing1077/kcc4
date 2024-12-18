import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  const { pathname, searchParams, host } = req.nextUrl;

  return NextResponse.json({
    pathname,
    host,
    q: searchParams.get('q'),
    ip: req.ip || host,
    cookies: req.cookies.getAll(),
  });
}
