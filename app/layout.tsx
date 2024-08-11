import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mahjong Scorer",
  description: "Track your Mahjong games and scores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="emerald" lang="en">
      <body className={`${inter.className} text-gray-700`}>
        <header className="container mx-auto px-6 sm:px-12 text-center">
          <h1 className="text-3xl md:text-6xl font-extrabold mb-6">Mahjong Scorer</h1>
          <NavBar />
        </header>
        <main className="container mx-auto px-6 sm:px-12 py-2">
          {children}
        </main>
      </body>
    </html>
  );
}