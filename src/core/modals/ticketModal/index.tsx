"use client";

import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { ErrorToaster, SuccessToaster } from "@/components/Toaster";
import {
  MAX_TICKETS_PER_TYPE,
  SERVICE_CHARGE_RATE,
  type TicketType,
} from "@/data/eventDetails";
import type { EventItem } from "@/data/events";
import { formatPrice, formatShortDate } from "@/utils/format";

type Props = {
  event: EventItem;
  tickets: TicketType[];
  initialTicketId?: string;
  onClose: () => void;
};

type TicketFormValues = {
  quantities: Record<string, number>;
};

// Ticket selection modal (Bootstrap modal markup, opened/closed by React state).
// Full screen on phones, centered + scrollable on larger screens.
export default function TicketModal({ event, tickets, initialTicketId, onClose }: Props) {
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<TicketFormValues>({
    defaultValues: {
      // Pre-select 1 of the ticket the user clicked "Select" on
      quantities: Object.fromEntries(
        tickets.map((ticket) => [
          ticket.id,
          ticket.id === initialTicketId && ticket.remaining > 0 ? 1 : 0,
        ])
      ),
    },
  });

  // useWatch (not watch) so totals re-render with the React Compiler
  const quantities = useWatch({ control, name: "quantities" });

  const selectedTickets = tickets
    .map((ticket) => ({ ...ticket, quantity: quantities?.[ticket.id] ?? 0 }))
    .filter((ticket) => ticket.quantity > 0);

  const totalQuantity = selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0);
  const subtotal = selectedTickets.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0);
  const serviceCharge = Math.round(subtotal * SERVICE_CHARGE_RATE);
  const total = subtotal + serviceCharge;

  // Lock page scroll and close on Escape while open
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  // *For Submit Form
  const submitForm = async () => {
    if (totalQuantity === 0) {
      ErrorToaster("Please select at least one ticket");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        event_id: event.id,
        event_slug: event.slug,
        tickets: selectedTickets.map((ticket) => ({
          ticket_type_id: ticket.id,
          name: ticket.name,
          quantity: ticket.quantity,
          unit_price: ticket.price,
          line_total: ticket.price * ticket.quantity,
        })),
        total_quantity: totalQuantity,
        subtotal,
        service_charge: serviceCharge,
        total_amount: total,
      };

      // TODO: replace with create booking API call, then go to checkout
      console.log("Booking payload:", payload);

      SuccessToaster("Tickets selected! Proceeding to checkout.");

      setTimeout(() => {
        onClose();
      }, 200);
    } catch (error: unknown) {
      ErrorToaster(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade show d-block cc-modal"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ticket-modal-title"
        // Close when clicking outside the dialog
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header align-items-start gap-3">
              <div className="flex-grow-1">
                <h2 className="modal-title h5 fw-bold mb-0" id="ticket-modal-title">
                  Select Tickets
                </h2>
                <p className="small text-body-secondary mb-0 mt-1">
                  {event.title} · {formatShortDate(event.date)}, {event.time}
                </p>
              </div>
              <button
                type="button"
                className="btn btn-outline-cc rounded-circle cc-icon-btn"
                onClick={onClose}
                aria-label="Close"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            {/* Body */}
            <div className="modal-body">
              <form id="ticket-form" onSubmit={handleSubmit(submitForm)} noValidate>
                {/* Ticket types */}
                <div className="d-flex flex-column gap-3">
                  {tickets.map((ticket) => {
                    const max = Math.min(MAX_TICKETS_PER_TYPE, ticket.remaining);
                    const isSoldOut = ticket.remaining === 0;

                    return (
                      <div
                        className={`cc-ticket-card p-3 ${
                          (quantities?.[ticket.id] ?? 0) > 0 ? "is-selected" : ""
                        }`}
                        key={ticket.id}
                      >
                        <div className="d-flex align-items-center justify-content-between gap-3">
                          <div>
                            <h3 className="h6 fw-semibold mb-1">{ticket.name}</h3>
                            <p className="fw-bold mb-1">{formatPrice(ticket.price)}</p>
                            <p className="small text-body-secondary mb-0">
                              {isSoldOut
                                ? "Sold out"
                                : `${ticket.remaining.toLocaleString("en-US")} left · max ${max} per order`}
                            </p>
                          </div>

                          <Controller
                            name={`quantities.${ticket.id}`}
                            control={control}
                            render={({ field }) => (
                              <div className="d-flex align-items-center gap-2 flex-shrink-0">
                                <button
                                  type="button"
                                  className="btn btn-outline-cc rounded-circle cc-qty-btn"
                                  onClick={() => field.onChange(field.value - 1)}
                                  disabled={field.value <= 0}
                                  aria-label={`Remove one ${ticket.name} ticket`}
                                >
                                  <i className="bi bi-dash" />
                                </button>
                                <span className="cc-qty-value fw-semibold text-center" aria-live="polite">
                                  {field.value}
                                </span>
                                <button
                                  type="button"
                                  className="btn btn-outline-cc rounded-circle cc-qty-btn"
                                  onClick={() => field.onChange(field.value + 1)}
                                  disabled={isSoldOut || field.value >= max}
                                  aria-label={`Add one ${ticket.name} ticket`}
                                >
                                  <i className="bi bi-plus" />
                                </button>
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Booking summary */}
                <div className="cc-info-tile p-3 p-md-4 mt-4">
                  <h3 className="h6 fw-semibold mb-3">Booking Summary</h3>

                  {selectedTickets.length === 0 ? (
                    <p className="small text-body-secondary mb-0">
                      No tickets selected yet. Use the + buttons above to add tickets.
                    </p>
                  ) : (
                    <>
                      <ul className="list-unstyled d-flex flex-column gap-2 small mb-3">
                        {selectedTickets.map((ticket) => (
                          <li className="d-flex justify-content-between gap-3" key={ticket.id}>
                            <span>
                              {ticket.name} × {ticket.quantity}
                            </span>
                            <span className="fw-medium">
                              {formatPrice(ticket.price * ticket.quantity)}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="border-top pt-3 d-flex flex-column gap-2 small">
                        <div className="d-flex justify-content-between">
                          <span className="text-body-secondary">Subtotal</span>
                          <span>{formatPrice(subtotal)}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span className="text-body-secondary">
                            Service charge ({SERVICE_CHARGE_RATE * 100}%)
                          </span>
                          <span>{formatPrice(serviceCharge)}</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold fs-6 pt-1">
                          <span>Total payable</span>
                          <span className="text-gradient">{formatPrice(total)}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <div className="d-flex align-items-center justify-content-between gap-3 w-100">
                <div className="lh-sm">
                  <span className="d-block small text-body-secondary">
                    Total ({totalQuantity} {totalQuantity === 1 ? "ticket" : "tickets"})
                  </span>
                  <span className="h5 fw-bold mb-0">{formatPrice(total)}</span>
                </div>
                <button
                  type="submit"
                  form="ticket-form"
                  className="btn btn-gradient px-4 py-2 d-inline-flex align-items-center gap-2"
                  disabled={loading || totalQuantity === 0}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm" aria-hidden="true" />
                  )}
                  {loading ? "Processing..." : "Proceed to Checkout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
}
