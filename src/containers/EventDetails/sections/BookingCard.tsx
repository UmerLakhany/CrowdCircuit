"use client";

import { useState } from "react";
import { ErrorToaster, SuccessToaster } from "@/components/Toaster";
import type { TicketType } from "@/data/eventDetails";
import type { EventItem } from "@/data/events";
import { formatPrice, formatShortDate } from "@/utils/format";
import BookTicketButton from "./BookTicketButton";

type Props = {
  event: EventItem;
  tickets: TicketType[];
};

export default function BookingCard({ event, tickets }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  const lowestPrice = Math.min(...tickets.map((ticket) => ticket.price));
  const ticketsLeft = tickets.reduce((sum, ticket) => sum + ticket.remaining, 0);

  // TODO: save favorite via API
  const toggleFavorite = () => setIsFavorite((prev) => !prev);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: event.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        SuccessToaster("Event link copied to clipboard");
      }
    } catch (error: unknown) {
      // User closing the share sheet is not an error
      if (error instanceof Error && error.name === "AbortError") return;
      ErrorToaster("Could not share this event");
    }
  };

  return (
    <div className="cc-card cc-booking-card p-4">
      <p className="small text-body-secondary mb-1">Tickets starting from</p>
      <p className="h2 fw-bold text-gradient mb-3">{formatPrice(lowestPrice)}</p>

      <ul className="list-unstyled d-flex flex-column gap-2 small mb-4">
        <li className="d-flex align-items-center gap-2">
          <i className="bi bi-calendar-event text-body-secondary" />
          {formatShortDate(event.date)} · {event.time}
        </li>
        <li className="d-flex align-items-center gap-2">
          <i className="bi bi-geo-alt text-body-secondary" />
          <span className="text-truncate">
            {event.venue}, {event.city}
          </span>
        </li>
        <li className="d-flex align-items-center gap-2">
          <i className="bi bi-ticket-perforated text-body-secondary" />
          {ticketsLeft.toLocaleString("en-US")} tickets left
        </li>
      </ul>

      <BookTicketButton className="btn btn-gradient w-100 py-2 mb-2 d-inline-flex align-items-center justify-content-center gap-2">
        <i className="bi bi-ticket-perforated" />
        Book Tickets
      </BookTicketButton>

      <div className="row g-2">
        <div className="col-6">
          <button
            type="button"
            className={`btn btn-outline-cc w-100 d-inline-flex align-items-center justify-content-center gap-2 ${
              isFavorite ? "active" : ""
            }`}
            onClick={toggleFavorite}
            aria-pressed={isFavorite}
          >
            <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`} />
            {isFavorite ? "Saved" : "Save"}
          </button>
        </div>
        <div className="col-6">
          <button
            type="button"
            className="btn btn-outline-cc w-100 d-inline-flex align-items-center justify-content-center gap-2"
            onClick={handleShare}
          >
            <i className="bi bi-share" />
            Share
          </button>
        </div>
      </div>

      <p className="small text-body-secondary text-center mt-3 mb-0">
        <i className="bi bi-shield-check me-1" />
        Secure checkout · Instant QR tickets
      </p>
    </div>
  );
}
