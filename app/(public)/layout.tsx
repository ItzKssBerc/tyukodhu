import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./../globals.css";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
