import type { Metadata } from "next";
import "./globals.css";
import { titleFont } from "@/config/fonts";

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "E-Commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${titleFont.variable} antialiased px-5 sm:px-16 selection:bg-primary selection:text-dark`}
      >
        {children}
      </body>
    </html>
  );
}
