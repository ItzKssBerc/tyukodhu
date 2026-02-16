import type { Metadata } from "next";
import "../globals.css";

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { client } from "@/sanity/lib/client";
import { OLDALBEALLITASOK_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

import Nav from "@/components/Nav";
import Footer from "./Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "TYUKOD.HU",
  description: "Tyukod község hivatalos weboldala",
};

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await client.fetch(OLDALBEALLITASOK_QUERY);
  const siteEmblem = data?.oldalemblema
    ? (data.oldalemblema.secure_url || urlFor(data.oldalemblema).url())
    : null;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        {siteEmblem && (
          <>
            <link rel="icon" href={siteEmblem} type="image/svg+xml" />
            <link rel="shortcut icon" href={siteEmblem} type="image/svg+xml" />
          </>
        )}
      </head>
      <body className="antialiased theme-transition min-h-screen flex flex-col">
        <div className="fixed inset-0 z-[-1] bg-dot-pattern pointer-events-none" aria-hidden="true"></div>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <Nav siteEmblem={siteEmblem} />
          <main className="flex-grow w-full relative">
            {children}
          </main>
          <Footer siteEmblem={siteEmblem} />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
