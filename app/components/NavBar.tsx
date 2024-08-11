"use client";
import Link from "next/link"
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/game", label: "Games" },
    { href: "/account", label: "Profile" },
]

const NavBar = () => {
    const path = usePathname().split('/')[1]
    console.log(`path: ${path}`)
    return (
        <>
            <nav role="tablist" className="tabs tabs-boxed">
                {
                    navLinks.map((link) => (
                        <Link key={link.href} href={link.href} role="tab" className={`tab ${usePathname().split('/')[1] === link.href.split('/')[1] ? "tab-active" : ""}`}>
                            {link.label}
                        </Link>
                    ))
                }
            </nav>
        </>
    )
}

export default NavBar