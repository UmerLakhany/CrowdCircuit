"use client";

import { useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { AUTH_LINKS, MAIN_NAV_LINKS } from "@/data/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
};

// Bootstrap offcanvas markup, opened/closed by React state
export default function MobileDrawer({ open, onClose, isActive }: Props) {
  // Lock page scroll and close on Escape while drawer is open
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <>
      <div
        className={`offcanvas offcanvas-end cc-drawer d-xl-none ${
          open ? "show" : ""
        }`}
        id="mobile-drawer"
        tabIndex={-1}
        aria-label="Mobile navigation"
        aria-modal={open}
        role="dialog"
        inert={!open}
      >
        <div className="offcanvas-header border-bottom justify-content-between gap-3">
          <Logo height={40} />
          <button
            type="button"
            className="btn btn-outline-cc rounded-circle cc-icon-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="offcanvas-body">
          <p className="small fw-semibold text-uppercase text-body-secondary mb-2">
            Menu
          </p>
          <ul className="nav nav-pills flex-column gap-1">
            {MAIN_NAV_LINKS.map((link) => (
              <li className="nav-item" key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={`nav-link d-flex align-items-center gap-3 py-2 ${
                    isActive(link.href) ? "active" : ""
                  }`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  <i className={`bi ${link.icon} fs-5`} />
                  <span>{link.label}</span>
                  <i className="bi bi-chevron-right small ms-auto opacity-50" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-top p-3">
          <Link
            href={AUTH_LINKS.login}
            onClick={onClose}
            className="btn btn-gradient w-100 py-2 d-inline-flex align-items-center justify-content-center gap-2"
          >
            <i className="bi bi-person-circle" />
            Sign In
          </Link>
          <p className="small text-body-secondary text-center mt-3 mb-0">
            Every Event. Every Connection. One Circuit.
          </p>
        </div>
      </div>

      {/* Backdrop: stays mounted so it can fade out */}
      <div
        className={`offcanvas-backdrop fade d-xl-none ${
          open ? "show" : "pe-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
    </>
  );
}
