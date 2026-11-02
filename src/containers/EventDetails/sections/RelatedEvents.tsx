import EventCard from "@/components/EventCard";
import SectionHeader from "@/components/SectionHeader";
import type { EventItem } from "@/data/events";
import { route } from "@/data/routes";

type Props = {
  events: EventItem[];
};

export default function RelatedEvents({ events }: Props) {
  if (events.length === 0) return null;

  return (
    <section className="cc-section cc-section-alt">
      <div className="container">
        <SectionHeader
          eyebrow="You may also like"
          title="Related Events"
          subtitle="More experiences similar to this one."
          action={{ label: "View All Events", href: route.events }}
        />

        <div className="row g-4">
          {events.map((event) => (
            <div className="col-12 col-sm-6 col-lg-3" key={event.id}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
