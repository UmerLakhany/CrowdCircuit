import Image from "next/image";
import Link from "next/link";
import type { EventItem } from "@/data/events";
import { route } from "@/data/routes";
import { formatCount, formatShortDate } from "@/utils/format";

type Props = {
  event: EventItem;
};

export default function EventHero({ event }: Props) {
  return (
    <section className="cc-event-hero position-relative overflow-hidden d-flex align-items-end">
      <Image
        src={event.image}
        alt={event.title}
        fill
        priority
        sizes="100vw"
        className="object-fit-cover"
      />
      <div className="cc-event-hero-overlay" />

      <div className="container position-relative pb-4 pb-lg-5 pt-5">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb small mb-3">
            <li className="breadcrumb-item">
              <Link href={route.home}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href={route.events}>Events</Link>
            </li>
            <li className="breadcrumb-item active text-truncate" aria-current="page">
              {event.title}
            </li>
          </ol>
        </nav>

        <span className="cc-badge badge rounded-pill px-3 py-2 mb-3">{event.category}</span>
        <h1 className="display-5 fw-bold text-white mb-3 cc-event-hero-title">{event.title}</h1>

        <ul className="list-unstyled d-flex flex-wrap gap-2 gap-md-3 mb-0">
          <li className="cc-hero-chip">
            <i className="bi bi-calendar-event" />
            {formatShortDate(event.date)}
          </li>
          <li className="cc-hero-chip">
            <i className="bi bi-clock" />
            {event.time}
          </li>
          <li className="cc-hero-chip">
            <i className="bi bi-geo-alt" />
            {event.venue}, {event.city}
          </li>
          <li className="cc-hero-chip">
            <i className="bi bi-people" />
            {formatCount(event.attendees)} going
          </li>
        </ul>
      </div>
    </section>
  );
}
