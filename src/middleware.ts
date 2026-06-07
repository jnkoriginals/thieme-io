import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['de', 'en'] as const;
const DEFAULT_LOCALE = 'de';

function getPreferredLocale(request: NextRequest): string {
    const accept = request.headers.get('accept-language') ?? '';
    const deIdx = accept.indexOf('de');
    const enIdx = accept.indexOf('en');
    if (enIdx !== -1 && (deIdx === -1 || enIdx < deIdx)) return 'en';
    return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const pathnameLocale = LOCALES.find(
        (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
    );

    if (pathnameLocale) {
        const response = NextResponse.next();
        response.headers.set('x-lang', pathnameLocale);
        return response;
    }

    const locale = getPreferredLocale(request);
    const redirectPath = pathname === '/' ? '' : pathname;
    return NextResponse.redirect(new URL(`/${locale}${redirectPath}`, request.url));
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.[a-z]+$).*)'],
};
