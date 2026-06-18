import { NextResponse } from 'next/server';

export default function proxy(request) {
  const sessionCookie = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  // 1. Proteksi rute Admin (/dashboard/*)
  if (pathname.startsWith('/dashboard')) {
    if (!sessionCookie) {
      // Jika belum login, redirect ke halaman login
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      // Decode base64 session data (menggunakan atob karena berjalan di Edge Runtime)
      const sessionData = JSON.parse(atob(decodeURIComponent(sessionCookie.value)));

      // Hanya izinkan admin masuk ke dashboard
      if (sessionData.role !== 'admin' && !sessionData.is_admin) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (err) {
      // Jika cookie invalid/corrupt, bersihkan cookie dan redirect ke login
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      response.cookies.delete('session');
      return response;
    }
  }

  // 2. Cegah user yang sudah login mengakses halaman login/register
  if (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register')) {
    if (sessionCookie) {
      try {
        const sessionData = JSON.parse(atob(decodeURIComponent(sessionCookie.value)));
        if (sessionData.role === 'admin' || sessionData.is_admin) {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        } else {
          return NextResponse.redirect(new URL('/', request.url));
        }
      } catch (err) {
        // Biarkan lewat jika session cookie tidak valid
      }
    }
  }

  return NextResponse.next();
}

// Hanya jalankan middleware untuk rute tertentu
export const config = {
  matcher: ['/dashboard/:path*', '/auth/login', '/auth/register'],
};
