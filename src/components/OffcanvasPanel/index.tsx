"use client";

import { ReactNode, useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  placement?: "start" | "end";
  // Hide panel at/above this breakpoint (e.g. "lg" = mobile/tablet only)
  hideFrom?: "md" | "lg" | "xl";
  footer?: ReactNode;
  children: ReactNode;
};

// Generic Bootstrap offcanvas, opened/closed by React state
export default function OffcanvasPanel({
  open,
  onClose,
  title,
  placement = "start",
  hideFrom,
  footer,
  children,
}: Props) {
  // Lock page scroll and close on Escape while open
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

  const hideClass = hideFrom ? `d-${hideFrom}-none` : "";

  return (
    <>
      <div
        className={`offcanvas offcanvas-${placement} cc-offcanvas ${hideClass} ${
          open ? "show" : ""
        }`}
        tabIndex={-1}
        role="dialog"
        aria-label={title}
        aria-modal={open}
        inert={!open}
      >
        <div className="offcanvas-header border-bottom justify-content-between gap-3">
          <h2 className="h5 fw-semibold mb-0">{title}</h2>
          <button
            type="button"
            className="btn btn-outline-cc rounded-circle cc-icon-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="offcanvas-body">{children}</div>

        {footer && <div className="border-top p-3">{footer}</div>}
      </div>

      {/* Backdrop: stays mounted so it can fade out */}
      <div
        className={`offcanvas-backdrop fade ${hideClass} ${open ? "show" : "pe-none"}`}
        onClick={onClose}
        aria-hidden="true"
      />
    </>
  );
}
