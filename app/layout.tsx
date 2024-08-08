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
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-gray-300`}>
        <header className="container mx-auto p-6 sm:p-12 text-center">
          <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-6">Mahjong Scorer</h1>
          <NavBar />
        </header>
        <main className="container mx-auto p-6 sm:p-12">
          {children}
        </main>
      </body>
    </html>
  );
}