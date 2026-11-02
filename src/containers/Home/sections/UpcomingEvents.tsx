import EventCard from "@/components/EventCard";
import SectionHeader from "@/components/SectionHeader";
import { EVENTS } from "@/data/events";

export default function UpcomingEvents() {
  // ISO dates sort correctly as strings
  const upcoming = [...EVENTS]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  return (
    <section className="cc-section cc-section-alt">
      <div className="container">
        <SectionHeader
          eyebrow="Coming Soon"
          title="Upcoming Events"
          subtitle="Plan ahead — these events are happening in the coming weeks."
          action={{ label: "View Calendar", href: "/events?sort=upcoming" }}
        />

        <div className="row g-3 g-lg-4">
          {upcoming.map((event) => (
            <div className="col-12 col-lg-6" key={event.id}>
              <EventCard event={event} variant="list" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
