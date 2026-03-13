import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <main className="w-full md:max-w-5xl 2xl:max-w-7xl mx-auto">
          <TopMenu />
          <Sidebar />
          { children }
          <Footer className="mt-10" />
        </main>
    )
}