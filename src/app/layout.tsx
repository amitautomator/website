import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Automate Ideas",
  description: "Transform Your Business with Automation Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${roboto.className} h-screen w-full bg-[--color-background] font-[--font-primary] text-[--color-foreground] antialiased dark:bg-[--color-background-dark]`}
        data-new-gr-c-s-check-loaded="14.1240.0"
        data-gr-ext-installed=""
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
