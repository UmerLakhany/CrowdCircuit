"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { EventItem } from "@/data/events";
import { route } from "@/data/routes";
import {
  formatCount,
  formatDate,
  formatPrice,
  getDayMonth,
} from "@/utils/format";

type Props = {
  event: EventItem;
  variant?: "grid" | "list";
  badge?: { label: string; icon: string };
  showAttendees?: boolean;
};

export default function EventCard({
  event,
  variant = "grid",
  badge,
  showAttendees,
}: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const detailsHref = route.eventDetails(event.slug);
  const { day, month } = getDayMonth(event.date);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    // TODO: save favorite via API
    console.log(isFavorite ? "Removed favorite:" : "Added favorite:", event.slug);
  };

  const favoriteButton = (
    <button
      type="button"
      className={`cc-fav-btn ${isFavorite ? "is-active" : ""}`}
      onClick={toggleFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFavorite}
    >
      <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`} />
    </button>
  );

  // Horizontal card with date block (used for upcoming lists)
  if (variant === "list") {
    return (
      <article className="cc-event-card h-100">
        <div className="row g-0 h-100">
          <div className="col-5 col-sm-4 position-relative cc-event-media">
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="(max-width: 576px) 40vw, 220px"
              className="object-fit-cover"
            />
            <div className="cc-date-badge position-absolute top-0 start-0 m-2 text-center">
              <span className="d-block fs-5 fw-bold lh-1">{day}</span>
              <span className="small text-uppercase">{month}</span>
            </div>
          </div>

          <div className="col-7 col-sm-8 d-flex flex-column p-3">
            <span className="cc-card-category small mb-1">{event.category}</span>
            <h3 className="h6 fw-semibold cc-line-clamp-2 mb-2">
              <Link href={detailsHref} className="text-reset stretched-link">
                {event.title}
              </Link>
            </h3>
            <p className="small text-body-secondary mb-1">
              <i className="bi bi-clock me-2" />
              {event.time}
            </p>
            <p className="small text-body-secondary mb-3 text-truncate">
              <i className="bi bi-geo-alt me-2" />
              {event.venue}, {event.city}
            </p>
            <p className="mt-auto mb-0 small">
              <span className="text-body-secondary">From </span>
              <span className="fw-semibold">{formatPrice(event.price)}</span>
            </p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="cc-event-card h-100 d-flex flex-column">
      <div className="position-relative cc-event-media">
        <div className="ratio ratio-16x9">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 25vw"
            className="object-fit-cover"
          />
        </div>

        <div className="position-absolute top-0 start-0 end-0 p-3 d-flex justify-content-between align-items-start">
          {badge ? (
            <span className="cc-badge badge rounded-pill d-inline-flex align-items-center gap-1">
              <i className={`bi ${badge.icon}`} />
              {badge.label}
            </span>
          ) : (
            <span className="cc-badge badge rounded-pill">{event.category}</span>
          )}
          {favoriteButton}
        </div>
      </div>

      <div className="d-flex flex-column flex-grow-1 p-3 p-lg-4">
        {badge && <span className="cc-card-category small mb-1">{event.category}</span>}
        <h3 className="h5 fw-semibold cc-line-clamp-2 mb-3">{event.title}</h3>

        <ul className="list-unstyled small text-body-secondary d-flex flex-column gap-2 mb-4">
          <li>
            <i className="bi bi-calendar-event me-2" />
            {formatDate(event.date)} · {event.time}
          </li>
          <li className="text-truncate">
            <i className="bi bi-geo-alt me-2" />
            {event.venue}, {event.city}
          </li>
          {showAttendees && (
            <li>
              <i className="bi bi-people me-2" />
              {formatCount(event.attendees)} people going
            </li>
          )}
        </ul>

        <div className="mt-auto d-flex align-items-center justify-content-between gap-2 pt-3 border-top">
          <div className="lh-sm">
            <span className="d-block small text-body-secondary">Starting from</span>
            <span className="fw-bold">{formatPrice(event.price)}</span>
          </div>
          <Link href={detailsHref} className="btn btn-gradient btn-sm px-3 py-2">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
