"use client";
import Link from "next/link"
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/game-list", label: "Games" },
    { href: "/account", label: "Profile" },
]

const NavBar = () => {
    return (
        <>
            <nav role="tablist" className="tabs tabs-boxed">
                {
                    navLinks.map((link) => (
                        <Link key={link.href} href={link.href} role="tab" className={`tab ${usePathname() === link.href ? "tab-active" : ""}`}>
                            {link.label}
                        </Link>
                    ))
                }
            </nav>
        </>
    )
}

export default NavBar