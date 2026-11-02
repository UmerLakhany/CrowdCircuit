import EventCard from "@/components/EventCard";
import SectionHeader from "@/components/SectionHeader";
import { route } from "@/data/routes";
import { EVENTS } from "@/data/events";

export default function FeaturedEvents() {
  const featured = EVENTS.filter((event) => event.featured).slice(0, 4);

  return (
    <section className="cc-section">
      <div className="container">
        <SectionHeader
          eyebrow="Featured"
          title="Featured Events"
          subtitle="Hand-picked experiences you don't want to miss."
          action={{ label: "View All Events", href: route.events }}
        />

        <div className="row g-4">
          {featured.map((event) => (
            <div className="col-12 col-sm-6 col-lg-3" key={event.id}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
