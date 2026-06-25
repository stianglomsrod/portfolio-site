import type { Metadata } from "next";
import "./globals.css";

// Absolute base URL for OG/canonical metadata. Set NEXT_PUBLIC_SITE_URL to the
// final domain in Vercel; otherwise fall back to the Vercel-provided production
// URL, and finally to localhost for local dev.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = "Stian Glomsrød — fullstack utvikler";
const description =
  "Fullstackutvikling, brukerinnsikt fra workshops og AI som praktisk utviklingsverktøy.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: title,
  authors: [{ name: "Stian Glomsrød" }],
  creator: "Stian Glomsrød",
  keywords: [
    "fullstack utvikler",
    "brukerinnsikt",
    "workshops",
    "produktutvikling",
    "Next.js",
    "React",
    "TypeScript",
    "Supabase",
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
    <html lang="nb" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
