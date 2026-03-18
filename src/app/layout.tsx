import type { Metadata } from "next";
import "./globals.css";
import 'goey-toast/styles.css'
import { titleFont } from "@/config/fonts";
import { Provider } from "@/components";

export const metadata: Metadata = {
  title: {
    template: "%s | E-Commerce",
    default: "Home | E-Commerce",
  },
  description: "E-Commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${titleFont.variable} antialiased px-5 sm:px-16 selection:bg-primary selection:text-dark`}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}