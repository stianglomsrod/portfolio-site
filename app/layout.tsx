import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Absolute base URL for OG/canonical metadata. Set NEXT_PUBLIC_SITE_URL to the
// final domain in Vercel; otherwise fall back to the Vercel-provided production
// URL, and finally to localhost for local dev.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = "Stian Glomsrød — AI-first utvikler";
const description =
  "Fullstack produktbygging med AI-agenter, disiplinert arbeidsflyt og tydelig kvalitetssikring.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: title,
  authors: [{ name: "Stian Glomsrød" }],
  creator: "Stian Glomsrød",
  keywords: [
    "fullstack",
    "AI-first",
    "AI-agenter",
    "produktutvikling",
    "Next.js",
    "React",
    "TypeScript",
    "portefølje",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    url: "/",
    siteName: title,
    title,
    description,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nb"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Mark that JS is available BEFORE first paint. Scroll-reveal content is
          only hidden when `html.js` is present, so if JS is blocked/disabled the
          content stays fully visible (progressive enhancement, no hidden traps).
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
