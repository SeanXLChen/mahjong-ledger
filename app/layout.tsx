import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Link from "next/link";
import AvatarWrap from "./components/AvatarWrap";

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
          {/* Symbols displayed based on screen size */}
          <p className="text-3xl mb-3 mt-1">
            {/* Small screens (sm) */}
            <span className="block sm:hidden">
              &#x1F007;
              &#x1F008;
              &#x1F009;
              &#x1F00A;
              &#x1F00B;
              &#x1F00C;
              &#x1F00D;
              &#x1F00E;
              &#x1F00F;
            </span>
            {/* Medium screens (md) */}
            <span className="hidden sm:block md:hidden">
              &#x1F007;
              &#x1F008;
              &#x1F009;
              &#x1F00A;
              &#x1F00B;
              &#x1F00C;
              &#x1F00D;
              &#x1F00E;
              &#x1F00F;
              &#x1F000;
              &#x1F001;
              &#x1F002;
              &#x1F003;
            </span>
            {/* Large screens (lg and up) */}
            <span className="hidden md:block">
              &#x1F007; &#x1F008; &#x1F009; &#x1F00A; &#x1F00B;

              &#x1F010; &#x1F011; &#x1F012; &#x1F013;
              &#x1F014;
              &#x1F019;
              &#x1F01A; &#x1F01B; &#x1F01C; &#x1F01D;
              &#x1F000; &#x1F001; &#x1F002; &#x1F003;
              &#x1F005;
            </span>

          </p>

          {/* <Link href="/">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 object-center">Mahjong Scorer</h1>
          </Link> */}

          <section>

            <div className="navbar bg-base-100 rounded-lg mb-3">
              <div className="navbar-start">
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                      <Link href="/">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/about">
                        About
                      </Link>

                    </li>
                  </ul>
                </div>
              </div>

              <div className="navbar-center">
                <Link href="/" className="flex justify-center items-center">
                  <h1 className="text-2xl md:text-4xl font-extrabold flex justify-center items-center">Mahjong Scorer</h1>
                </Link>
              </div>
              <div className="navbar-end">



                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-13 rounded-full">
                      <AvatarWrap />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                      <Link href="/profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link href="/signout">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>

              </div>
            </div>

          </section>

        </header>
        <main className="container mx-auto px-6 sm:px-12 py-2">
          {children}
        </main>
      </body>
    </html>
  );
}