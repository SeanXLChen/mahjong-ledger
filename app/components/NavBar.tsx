"use client";
import Link from "next/link"
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/details", label: "Details" },
    { href: "/account", label: "Profile" },
]

const NavBar = () => {
    return (
        <>
            <nav className="flex justify-center space-x-4">
                {
                    navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className={`text-lg text-blue-800 hover:underline ${usePathname() === link.href ? "text-blue-400" : ""}`}>
                            {link.label}
                        </Link>
                    ))
                }
            </nav>
        </>
    )
}

export default NavBar