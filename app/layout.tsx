import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Niche Product Roulette",
  description: "Spin through 3 stages and discover a random product opportunity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-black text-white selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
