import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { route } from "@/data/routes";
import { HOT_CATEGORIES } from "@/data/trending";

export default function HotCategories() {
  return (
    <section className="cc-section">
      <div className="container">
        <SectionHeader
          eyebrow="Rising"
          title="Hot Categories This Week"
          subtitle="Categories with the biggest jump in bookings."
          action={{ label: "All Categories", href: route.categories }}
        />

        <div className="row g-3 g-lg-4">
          {HOT_CATEGORIES.map((category) => (
            <div className="col-12 col-sm-6 col-lg-3" key={category.slug}>
              <Link
                href={route.categoryDetails(category.slug)}
                className="cc-category-card d-flex align-items-center gap-3 h-100 p-3 p-lg-4 text-reset"
              >
                <span className="cc-category-icon flex-shrink-0">
                  <i className={`bi ${category.icon}`} />
                </span>
                <span className="flex-grow-1">
                  <span className="d-block fw-semibold">{category.name}</span>
                  <span className="d-block small text-body-secondary">
                    {category.eventCount} events
                  </span>
                </span>
                <span className="cc-growth-badge flex-shrink-0">
                  <i className="bi bi-arrow-up-right" />
                  {category.growth}%
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
