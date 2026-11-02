import { formatPrice } from "@/utils/format";
import BookTicketButton from "./BookTicketButton";

type Props = {
  lowestPrice: number;
};

// Fixed bottom bar on mobile / tablet so "Book Tickets" is always reachable
export default function MobileBookingBar({ lowestPrice }: Props) {
  return (
    <div className="cc-mobile-booking-bar d-lg-none">
      <div className="container d-flex align-items-center justify-content-between gap-3 py-3">
        <div className="lh-sm">
          <span className="d-block small text-body-secondary">Starting from</span>
          <span className="fw-bold">{formatPrice(lowestPrice)}</span>
        </div>
        <BookTicketButton className="btn btn-gradient px-4 py-2">Book Tickets</BookTicketButton>
      </div>
    </div>
  );
}
