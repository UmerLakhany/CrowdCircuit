import EventCard from "@/components/EventCard";
import SectionHeader from "@/components/SectionHeader";
import { CATEGORIES } from "@/data/categories";
import { EVENTS } from "@/data/events";
import { route } from "@/data/routes";

// Most popular category (by event count) with a few of its events
const TOP_CATEGORY = [...CATEGORIES].sort((a, b) => b.eventCount - a.eventCount)[0];
const SPOTLIGHT_EVENTS = EVENTS.filter((event) => event.category === TOP_CATEGORY.name).slice(0, 4);

export default function CategorySpotlight() {
  if (SPOTLIGHT_EVENTS.length === 0) return null;

  return (
    <section className="cc-section cc-section-alt">
      <div className="container">
        <SectionHeader
          eyebrow="Most popular category"
          title={`Popular in ${TOP_CATEGORY.name}`}
          subtitle={TOP_CATEGORY.description}
          action={{ label: `View ${TOP_CATEGORY.name}`, href: route.categoryDetails(TOP_CATEGORY.slug) }}
        />

        <div className="row g-4">
          {SPOTLIGHT_EVENTS.map((event) => (
            <div className="col-12 col-sm-6 col-lg-3" key={event.id}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
