import type { EventDetails } from "@/data/eventDetails";
import type { EventItem } from "@/data/events";
import BookingCard from "./sections/BookingCard";
import EventAbout from "./sections/EventAbout";
import EventHero from "./sections/EventHero";
import EventOrganizer from "./sections/EventOrganizer";
import EventPolicies from "./sections/EventPolicies";
import EventTickets from "./sections/EventTickets";
import EventVenue from "./sections/EventVenue";
import MobileBookingBar from "./sections/MobileBookingBar";
import RelatedEvents from "./sections/RelatedEvents";
import { TicketModalProvider } from "./TicketModalContext";

type Props = {
  event: EventItem;
  details: EventDetails;
  relatedEvents: EventItem[];
};

export default function EventDetailsPage({ event, details, relatedEvents }: Props) {
  const lowestPrice = Math.min(...details.tickets.map((ticket) => ticket.price));

  return (
    <TicketModalProvider event={event} tickets={details.tickets}>
      <div className="cc-has-mobile-bar">
        <EventHero event={event} />

        <section className="cc-section pt-4 pt-lg-5">
          <div className="container">
            <div className="row g-4 g-xl-5">
              {/* Main content */}
              <div className="col-12 col-lg-8 d-flex flex-column gap-4">
                <EventAbout event={event} details={details} />
                <EventTickets tickets={details.tickets} />
                <EventVenue event={event} address={details.address} />
                <EventOrganizer organizer={details.organizer} />
                <EventPolicies rules={details.rules} ageRestriction={details.ageRestriction} />
              </div>

              {/* Booking sidebar (desktop) */}
              <aside className="col-lg-4 d-none d-lg-block">
                <div className="cc-sticky-sidebar">
                  <BookingCard event={event} tickets={details.tickets} />
                </div>
              </aside>
            </div>
          </div>
        </section>

        <RelatedEvents events={relatedEvents} />

        <MobileBookingBar lowestPrice={lowestPrice} />
      </div>
    </TicketModalProvider>
  );
}
