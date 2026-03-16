import { getCategories } from "@/actions/product/category";
import { Footer, Sidebar, TopMenu } from "@/components";
import { UserMenuItem } from "@/components/ui/TopMenu/UserMenuItem";

export default async function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { categories } = await getCategories()

  return (
    <main className="w-full md:max-w-5xl 2xl:max-w-7xl mx-auto">
      <TopMenu>
        <UserMenuItem />
      </TopMenu>
      <Sidebar categories={categories} />
      {children}
      <Footer className="mt-10" />
    </main>
  )
}