import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "funiche roulette",
  description: "Spin and discover a random category.",
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
