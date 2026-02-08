


import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { OLDALBEALLITASOK_QUERY, HIREK_QUERY, DOKUMENTUM_QUERY, KEP_QUERY, SZEMELY_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Carousel from "@/components/Carousel";
import NewsTicker from "@/components/NewsTicker";
import CarouselOverlay from "@/components/CarouselOverlay";
import Greeting from "@/components/Greeting";

export default async function Home() {
  // Fetch Data
  const [siteConfig, news, docs, gallery, people] = await Promise.all([
    client.fetch(OLDALBEALLITASOK_QUERY),
    client.fetch(HIREK_QUERY),
    client.fetch(DOKUMENTUM_QUERY),
    client.fetch(KEP_QUERY),
    client.fetch(SZEMELY_QUERY)
  ]);

  // Find Mayor
  const mayor = people?.find((p: any) =>
    p.titulus?.toLowerCase().includes("polgármester")
  );
  const mayorName = mayor?.nev;

  const carouselImages = siteConfig?.fokepcarousel?.map((image: any) => urlFor(image).url()) || [];

  // Prepare Items for Dashboard
  const newsItems = news?.slice(0, 5).map((item: any) => ({
    title: item.cim,
    url: `/hirek/${item.slug.current}`,
    date: item.datum,
    type: 'news' as const
  })) || [];

  const docItems = docs?.slice(0, 5).map((item: any) => ({
    title: item.dokumentumcim,
    url: `/onkormanyzat/dokumentumok`,
    date: item._createdAt.split('T')[0],
    type: 'document' as const
  })) || [];

  // Fallback if empty to ensure dashboard looks good for demo
  if (newsItems.length === 0) newsItems.push({ title: "Nincsenek friss hírek.", url: "#", date: "", type: "news" });
  if (docItems.length === 0) docItems.push({ title: "Nincsenek friss dokumentumok.", url: "#", date: "", type: "document" });

  return (
    <>
      {/* Carousel Section (Acts as background and dashboard container) */}
      <section className="w-full h-[85vh] p-0 m-0 overflow-hidden">
        <Carousel images={carouselImages}>
          <CarouselOverlay news={newsItems} documents={docItems} />
        </Carousel>
      </section>

      <Greeting images={gallery || []} mayorName={mayorName} />
    </>
  );
}
