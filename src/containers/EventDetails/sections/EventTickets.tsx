import type { TicketType } from "@/data/eventDetails";
import { formatPrice } from "@/utils/format";
import BookTicketButton from "./BookTicketButton";

type Props = {
  tickets: TicketType[];
};

// Less than 15% left = "selling fast"
const LOW_STOCK_RATIO = 0.15;

export default function EventTickets({ tickets }: Props) {
  return (
    <div className="cc-card p-4 p-lg-5" id="tickets">
      <h2 className="h4 fw-bold mb-1">Available Tickets</h2>
      <p className="text-body-secondary small mb-4">
        Prices are per person. Service charges are shown at checkout.
      </p>

      <div className="d-flex flex-column gap-3">
        {tickets.map((ticket) => {
          const soldPercent = Math.round(((ticket.total - ticket.remaining) / ticket.total) * 100);
          const isLow = ticket.remaining / ticket.total < LOW_STOCK_RATIO;
          const isSoldOut = ticket.remaining === 0;

          return (
            <div className="cc-ticket-card p-3 p-md-4" key={ticket.id}>
              <div className="row g-3 align-items-center">
                <div className="col-12 col-md">
                  <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                    <h3 className="h6 fw-semibold mb-0">{ticket.name}</h3>
                    {isSoldOut ? (
                      <span className="badge rounded-pill text-bg-secondary">Sold out</span>
                    ) : (
                      isLow && (
                        <span className="badge rounded-pill cc-badge-warning">
                          <i className="bi bi-lightning-charge-fill me-1" />
                          Selling fast
                        </span>
                      )
                    )}
                  </div>

                  <ul className="list-unstyled d-flex flex-wrap column-gap-3 row-gap-1 small text-body-secondary mb-3">
                    {ticket.perks.map((perk) => (
                      <li key={perk}>
                        <i className="bi bi-check2 me-1" />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <div
                    className="progress cc-progress"
                    role="progressbar"
                    aria-label={`${ticket.name} sold`}
                    aria-valuenow={soldPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div className="progress-bar" style={{ width: `${soldPercent}%` }} />
                  </div>
                  <p className="small text-body-secondary mt-2 mb-0">
                    <span className={`fw-semibold ${isLow ? "text-danger" : "text-body"}`}>
                      {ticket.remaining.toLocaleString("en-US")}
                    </span>{" "}
                    of {ticket.total.toLocaleString("en-US")} tickets left
                  </p>
                </div>

                <div className="col-12 col-md-auto d-flex flex-md-column align-items-center align-items-md-end justify-content-between gap-2">
                  <p className="h5 fw-bold mb-0">{formatPrice(ticket.price)}</p>
                  <BookTicketButton
                    ticketId={ticket.id}
                    className={`btn btn-sm px-4 ${isSoldOut ? "btn-outline-cc" : "btn-gradient"}`}
                    disabled={isSoldOut}
                  >
                    {isSoldOut ? "Sold Out" : "Select"}
                  </BookTicketButton>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
