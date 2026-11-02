"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { AUTH_LINKS, MAIN_NAV_LINKS } from "@/data/navigation";
import MobileDrawer from "./MobileDrawer";
import SearchBar from "../searchBar";

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add shadow once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`cc-header sticky-top border-bottom ${
          scrolled ? "is-scrolled" : ""
        }`}
      >
        <div className="container h-100 d-flex align-items-center justify-content-between gap-3">
          <Logo height={40} />

          {/* Desktop navigation */}
          <nav className="d-none d-xl-block" aria-label="Main navigation">
            <ul className="nav flex-nowrap">
              {MAIN_NAV_LINKS.map((link) => (
                <li className="nav-item" key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link cc-nav-link text-nowrap ${
                      isActive(link.href) ? "active" : ""
                    }`}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className={`btn btn-outline-cc rounded-circle cc-icon-btn ${
                searchOpen ? "active" : ""
              }`}
              onClick={() => setSearchOpen((prev) => !prev)}
              aria-label={searchOpen ? "Close search" : "Open search"}
              aria-expanded={searchOpen}
            >
              <i className={`bi ${searchOpen ? "bi-x-lg" : "bi-search"}`} />
            </button>

            <Link
              href={AUTH_LINKS.login}
              className="btn btn-gradient px-4 d-none d-md-inline-flex align-items-center gap-2"
            >
              <i className="bi bi-person-circle" />
              Sign In
            </Link>

            {/* Drawer toggle (below xl) */}
            <button
              type="button"
              className="btn btn-outline-cc rounded-circle cc-icon-btn d-xl-none"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
            >
              <i className="bi bi-list fs-5" />
            </button>
          </div>
        </div>

        <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
      </header>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        isActive={isActive}
      />
    </>
  );
}
