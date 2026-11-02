import Link from "next/link";
import Logo from "@/components/Logo";
import {
  CONTACT_INFO,
  FOOTER_COLUMNS,
  LEGAL_LINKS,
  SOCIAL_LINKS,
} from "@/data/footer";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="cc-footer border-top mt-auto">
      <div className="container py-5">
        <div className="row g-4 gy-5">
          {/* Brand + socials */}
          <div className="col-12 col-lg-4">
            <Logo height={56} onDark />
            <p className="text-body-secondary small mt-3 mb-4 pe-lg-4">
              Discover concerts, festivals, conferences and live experiences
              happening around you — and secure your tickets in just a few
              clicks.
            </p>

            <div className="d-flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-cc rounded-circle cc-icon-btn"
                  aria-label={social.label}
                >
                  <i className={`bi ${social.icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div className="col-6 col-md-3 col-lg-2" key={column.title}>
              <h6 className="cc-footer-title text-uppercase small mb-3">
                {column.title}
              </h6>
              <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="cc-footer-link small">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="cc-footer-title text-uppercase small mb-3">
              Contact
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              {CONTACT_INFO.map((item) => (
                <li
                  key={item.text}
                  className="d-flex align-items-start gap-2 small"
                >
                  <i className={`bi ${item.icon} text-gradient`} />
                  {item.href ? (
                    <a href={item.href} className="cc-footer-link text-break">
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-body-secondary">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-top">
        <div className="container py-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-2 text-center text-md-start">
          <p className="small text-body-secondary mb-0">
            &copy; {year} CrowdCircuit. All rights reserved.
          </p>

          <ul className="list-unstyled d-flex flex-wrap justify-content-center gap-3 mb-0">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="cc-footer-link small">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
