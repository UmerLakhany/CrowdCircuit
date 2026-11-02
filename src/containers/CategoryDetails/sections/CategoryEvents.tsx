import Link from "next/link";
import EventCard from "@/components/EventCard";
import type { Category } from "@/data/categories";
import { SORT_OPTIONS } from "@/data/eventFilters";
import type { EventItem } from "@/data/events";
import { route } from "@/data/routes";

type Props = {
  category: Category;
  events: EventItem[];
};

// TODO: sort is UI only for now – connect to API later
export default function CategoryEvents({ category, events }: Props) {
  return (
    <section className="cc-section pt-4 pt-lg-5">
      <div className="container">
        {/* Toolbar */}
        <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mb-4">
          <div>
            <h2 className="h4 fw-bold mb-1">Upcoming {category.name} Events</h2>
            <p className="small text-body-secondary mb-0">
              Showing <span className="fw-semibold text-body">{events.length}</span>{" "}
              {events.length === 1 ? "event" : "events"}
            </p>
          </div>

          <select
            className="form-select cc-select-pill w-auto"
            defaultValue={SORT_OPTIONS[0].value}
            aria-label="Sort events"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {events.length > 0 ? (
          <div className="row g-4">
            {events.map((event) => (
              <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={event.id}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="cc-panel text-center p-5">
            <span className="cc-category-icon mb-3">
              <i className={`bi ${category.icon}`} />
            </span>
            <h3 className="h5 fw-semibold">No upcoming events yet</h3>
            <p className="text-body-secondary mb-4">
              New {category.name.toLowerCase()} events are added regularly. Check back soon or
              explore other events.
            </p>
            <Link href={route.events} className="btn btn-gradient px-4">
              Discover Events
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
