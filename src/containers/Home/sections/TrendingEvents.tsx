import EventCard from "@/components/EventCard";
import SectionHeader from "@/components/SectionHeader";
import { route } from "@/data/routes";
import { EVENTS } from "@/data/events";

export default function TrendingEvents() {
  const trending = EVENTS.filter((event) => event.trending)
    .sort((a, b) => b.attendees - a.attendees)
    .slice(0, 4);

  return (
    <section className="cc-section">
      <div className="container">
        <SectionHeader
          eyebrow="Trending"
          title="Trending Events"
          subtitle="The events everyone is talking about right now."
          action={{ label: "See Trending", href: route.trending }}
        />

        <div className="row g-4">
          {trending.map((event, index) => (
            <div className="col-12 col-sm-6 col-lg-3" key={event.id}>
              <EventCard
                event={event}
                badge={{ label: `#${index + 1} Trending`, icon: "bi-fire" }}
                showAttendees
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
