import type { EventItem } from "@/data/events";

type Props = {
  event: EventItem;
  address: string;
};

export default function EventVenue({ event, address }: Props) {
  const query = encodeURIComponent(address);
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <div className="cc-card p-4 p-lg-5" id="venue">
      <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="h4 fw-bold mb-1">Venue & Location</h2>
          <p className="fw-semibold mb-0">{event.venue}</p>
          <p className="small text-body-secondary mb-0">
            <i className="bi bi-geo-alt me-1" />
            {address}
          </p>
        </div>
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-cc px-4 d-inline-flex align-items-center gap-2 flex-shrink-0 align-self-start align-self-sm-center"
        >
          <i className="bi bi-map" />
          View Venue Location
        </a>
      </div>

      <div className="ratio ratio-16x9 cc-map">
        <iframe
          src={`https://www.google.com/maps?q=${query}&output=embed`}
          title={`Map of ${event.venue}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
