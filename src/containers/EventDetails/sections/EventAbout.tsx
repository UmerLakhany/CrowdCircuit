import type { EventDetails } from "@/data/eventDetails";
import type { EventItem } from "@/data/events";
import { formatFullDate } from "@/utils/format";

type Props = {
  event: EventItem;
  details: EventDetails;
};

export default function EventAbout({ event, details }: Props) {
  const infoItems = [
    { icon: "bi-calendar-event", label: "Date", value: formatFullDate(event.date) },
    {
      icon: "bi-clock",
      label: "Time",
      value: details.endTime ? `${event.time} – ${details.endTime}` : `${event.time} onwards`,
    },
    { icon: "bi-geo-alt", label: "Venue", value: `${event.venue}, ${event.city}` },
    { icon: "bi-tag", label: "Category", value: event.category },
    { icon: "bi-person-check", label: "Age", value: details.ageRestriction },
  ];

  return (
    <div className="cc-card p-4 p-lg-5">
      <h2 className="h4 fw-bold mb-3">About this event</h2>
      {details.description.map((paragraph) => (
        <p className="text-body-secondary" key={paragraph}>
          {paragraph}
        </p>
      ))}

      <h3 className="h6 fw-semibold mt-4 mb-3">Highlights</h3>
      <ul className="list-unstyled row g-2 mb-0">
        {details.highlights.map((item) => (
          <li className="col-12 col-md-6 d-flex align-items-start gap-2 small" key={item}>
            <i className="bi bi-check-circle-fill text-gradient" />
            {item}
          </li>
        ))}
      </ul>

      <hr className="my-4" />

      <h3 className="h6 fw-semibold mb-3">Event Information</h3>
      <div className="row g-3">
        {infoItems.map((item) => (
          <div className="col-12 col-sm-6" key={item.label}>
            <div className="cc-info-tile d-flex align-items-start gap-3 h-100 p-3">
              <span className="cc-info-icon flex-shrink-0">
                <i className={`bi ${item.icon}`} />
              </span>
              <div>
                <p className="small text-body-secondary mb-0">{item.label}</p>
                <p className="fw-semibold small mb-0">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
