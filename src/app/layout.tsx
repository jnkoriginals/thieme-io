// <html>/<body> are rendered in [lang]/layout.tsx so `lang` is known at build time
// and pages can be statically generated (reading headers() here forced dynamic rendering).
export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return children;
}
