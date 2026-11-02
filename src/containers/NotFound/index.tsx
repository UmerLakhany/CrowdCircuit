import Link from "next/link";
import { route } from "@/data/routes";

const QUICK_LINKS = [
  {
    label: "Discover Events",
    description: "Browse all upcoming events",
    href: route.events,
    icon: "bi-compass",
  },
  {
    label: "Categories",
    description: "Music, sports, tech and more",
    href: route.categories,
    icon: "bi-grid",
  },
  {
    label: "Trending",
    description: "What everyone is booking",
    href: route.trending,
    icon: "bi-fire",
  },
  {
    label: "Help Center",
    description: "Answers to common questions",
    href: route.help,
    icon: "bi-question-circle",
  },
];

export default function NotFoundPage() {
  return (
    <section className="cc-not-found cc-section overflow-hidden">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-12 col-md-10 col-lg-8">
            {/* 404 with a ticket in place of the 0 */}
            <div className="cc-404 d-flex align-items-center justify-content-center gap-2 gap-sm-3 mb-4" aria-hidden="true">
              <span className="text-gradient">4</span>
              <span className="cc-404-ticket">
                <i className="bi bi-ticket-perforated" />
              </span>
              <span className="text-gradient">4</span>
            </div>

            <span className="cc-pill-soft badge rounded-pill px-3 py-2 mb-3">
              Error 404 · Page not found
            </span>
            <h1 className="display-6 fw-bold mb-3">
              Oops! This page <span className="text-gradient">missed the show.</span>
            </h1>
            <p className="lead text-body-secondary mx-auto mb-4 cc-not-found-text">
              The page you&apos;re looking for doesn&apos;t exist, has been moved, or the
              event may no longer be available.
            </p>

            <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 gap-sm-3">
              <Link
                href={route.home}
                className="btn btn-gradient px-4 py-2 d-inline-flex align-items-center justify-content-center gap-2"
              >
                <i className="bi bi-house-door" />
                Back to Home
              </Link>
              <Link
                href={route.events}
                className="btn btn-outline-cc px-4 py-2 d-inline-flex align-items-center justify-content-center gap-2"
              >
                <i className="bi bi-compass" />
                Explore Events
              </Link>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-5 pt-lg-3">
          <p className="cc-eyebrow d-block text-center mb-4">Popular destinations</p>
          <div className="row g-3 g-lg-4">
            {QUICK_LINKS.map((link) => (
              <div className="col-12 col-sm-6 col-lg-3" key={link.href}>
                <Link
                  href={link.href}
                  className="cc-category-card d-flex align-items-center gap-3 h-100 p-3 text-reset"
                >
                  <span className="cc-category-icon flex-shrink-0">
                    <i className={`bi ${link.icon}`} />
                  </span>
                  <span>
                    <span className="d-block fw-semibold">{link.label}</span>
                    <span className="d-block small text-body-secondary">{link.description}</span>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
