import { getCategories } from "@/actions/product/category";
import { Footer, Sidebar, TopMenu } from "@/components";

export default async function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { categories } = await getCategories()

  return (
    <main className="w-full md:max-w-5xl 2xl:max-w-7xl mx-auto">
      <TopMenu />
      <Sidebar categories={categories} />
      {children}
      <Footer className="mt-10" />
    </main>
  )
}