import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['de', 'en'] as const;
const DEFAULT_LOCALE = 'de';

function getPreferredLocale(request: NextRequest): string {
    const accept = request.headers.get('accept-language') ?? '';
    const ranked = accept
        .split(',')
        .map((part) => {
            const [tag, q] = part.trim().split(';q=');
            return { lang: tag.split('-')[0].toLowerCase(), q: q ? parseFloat(q) : 1 };
        })
        .sort((a, b) => b.q - a.q);
    const match = ranked.find((r) => (LOCALES as readonly string[]).includes(r.lang));
    return match?.lang ?? DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const pathnameLocale = LOCALES.find(
        (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
    );

    if (pathnameLocale) return NextResponse.next();

    const locale = getPreferredLocale(request);
    const redirectPath = pathname === '/' ? '' : pathname;
    return NextResponse.redirect(new URL(`/${locale}${redirectPath}`, request.url));
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.[a-z]+$).*)'],
};
