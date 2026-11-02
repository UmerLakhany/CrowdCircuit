import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { route } from "@/data/routes";
import { TRENDING_EVENTS } from "@/data/trending";
import { formatCount, formatPrice, formatShortDate } from "@/utils/format";

const [TOP_EVENT, ...REST] = TRENDING_EVENTS;
const RUNNERS_UP = REST.slice(0, 4);

export default function TrendingSpotlight() {
  if (!TOP_EVENT) return null;

  return (
    <section className="cc-section">
      <div className="container">
        <SectionHeader
          eyebrow="Top 5"
          title="Trending Right Now"
          subtitle="The most booked and talked-about events on CrowdCircuit."
        />

        <div className="row g-4">
          {/* #1 event */}
          <div className="col-12 col-lg-7">
            <article className="cc-spotlight-card position-relative overflow-hidden h-100 d-flex">
              <Image
                src={TOP_EVENT.image}
                alt={TOP_EVENT.title}
                fill
                priority
                sizes="(max-width: 992px) 100vw, 60vw"
                className="object-fit-cover"
              />
              <div className="cc-category-image-overlay" />

              <div className="position-relative flex-grow-1 d-flex flex-column justify-content-between p-4 p-lg-5">
                <div className="d-flex flex-wrap gap-2">
                  <span className="cc-rank-pill">
                    <i className="bi bi-fire" />
                    #1 Trending
                  </span>
                  <span className="cc-badge badge rounded-pill px-3 py-2">{TOP_EVENT.category}</span>
                </div>

                <div>
                  <h3 className="h2 fw-bold text-white mb-3">{TOP_EVENT.title}</h3>
                  <ul className="list-unstyled d-flex flex-wrap gap-2 mb-4">
                    <li className="cc-hero-chip">
                      <i className="bi bi-calendar-event" />
                      {formatShortDate(TOP_EVENT.date)}
                    </li>
                    <li className="cc-hero-chip">
                      <i className="bi bi-geo-alt" />
                      {TOP_EVENT.city}
                    </li>
                    <li className="cc-hero-chip">
                      <i className="bi bi-people" />
                      {formatCount(TOP_EVENT.attendees)} going
                    </li>
                  </ul>

                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                    <div className="lh-sm text-white">
                      <span className="d-block small opacity-75">Starting from</span>
                      <span className="h4 fw-bold mb-0">{formatPrice(TOP_EVENT.price)}</span>
                    </div>
                    <Link
                      href={route.eventDetails(TOP_EVENT.slug)}
                      className="btn btn-gradient px-4 py-2 d-inline-flex align-items-center gap-2"
                    >
                      View Details
                      <i className="bi bi-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* #2 – #5 */}
          <div className="col-12 col-lg-5">
            <div className="cc-card p-3 p-md-4 h-100">
              <h3 className="h6 fw-semibold mb-3">Also trending</h3>
              <ol className="list-unstyled d-flex flex-column gap-2 mb-0">
                {RUNNERS_UP.map((event, index) => (
                  <li key={event.id}>
                    <Link
                      href={route.eventDetails(event.slug)}
                      className="cc-trending-item d-flex align-items-center gap-3 p-2 text-reset"
                    >
                      <span className="cc-rank-number flex-shrink-0">{index + 2}</span>
                      <span className="cc-trending-thumb position-relative flex-shrink-0 overflow-hidden">
                        <Image
                          src={event.image}
                          alt=""
                          fill
                          sizes="72px"
                          className="object-fit-cover"
                        />
                      </span>
                      <span className="flex-grow-1 overflow-hidden">
                        <span className="d-block fw-semibold small text-truncate">{event.title}</span>
                        <span className="d-block small text-body-secondary text-truncate">
                          {formatShortDate(event.date)} · {event.city}
                        </span>
                        <span className="d-block small cc-card-category">
                          <i className="bi bi-people me-1" />
                          {formatCount(event.attendees)} going
                        </span>
                      </span>
                      <i className="bi bi-chevron-right text-body-secondary d-none d-sm-inline" />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
