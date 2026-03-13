import { Footer } from "@/components";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <main className="h-screen grid place-items-center px-6">
            <div className="w-full">
                { children }
            </div>
          <Footer className="mt-10 self-end" />
        </main>
    )
}