import type { Metadata } from "next";
import "../globals.css";

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { client } from "@/sanity/lib/client";
import { OLDALBEALLITASOK_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export const revalidate = 60; // Revalidate every 60 seconds

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
  // Fetch siteConfig data
  const data = await client.fetch(OLDALBEALLITASOK_QUERY);
  const siteEmblem = data?.oldalemblema ? urlFor(data.oldalemblema).url() : null;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body className="antialiased bg-white dark:bg-stone-950 transition-colors duration-500">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <Nav siteEmblem={siteEmblem} />
          <main className="flex-grow w-full">{children}</main>
          <Footer siteEmblem={siteEmblem} />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
