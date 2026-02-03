import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import CookieConsent from "@/components/CookieConsent";
import InfoButton from "@/components/InfoButton";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./../globals.css";
import { client } from '@/tina/__generated__/client'; // Import client for TinaCMS query

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "TYUKOD.HU",
  description: "Tyukod község hivatalos weboldala",
};

export default async function PublicLayout({ // Make this an async component
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch siteConfig data
  const tinaSiteConfigData = await client.queries.siteConfig({ relativePath: 'site-config.md' });
  const siteConfig = tinaSiteConfigData.data.siteConfig;
  const siteEmblem = siteConfig?.siteEmblem || '';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav siteEmblem={siteEmblem} />
          <main className="flex-grow">{children}</main>
          <Footer siteEmblem={siteEmblem} />
          <CookieConsent />
          <InfoButton />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
