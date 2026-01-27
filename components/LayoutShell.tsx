"use client"

import { usePathname } from "next/navigation"
import NavbarPage from "@/app/navbar-component-01/page"

const HIDE_NAVBAR_PATHNAMES = ["/login", "/signup"]

export default function LayoutShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideNavbar = HIDE_NAVBAR_PATHNAMES.includes(pathname);

    return (
        <>
            {!hideNavbar && <NavbarPage />}
            {children}
        </>
    )
}