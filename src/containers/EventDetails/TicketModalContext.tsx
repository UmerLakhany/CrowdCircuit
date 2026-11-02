"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import type { TicketType } from "@/data/eventDetails";
import type { EventItem } from "@/data/events";
import TicketModal from "@/core/modals/ticketModal";

type TicketModalContextValue = {
  openTicketModal: (ticketId?: string) => void;
};

const TicketModalContext = createContext<TicketModalContextValue | null>(null);

type Props = {
  event: EventItem;
  tickets: TicketType[];
  children: ReactNode;
};

// Lets any button on the event page (booking card, ticket rows, mobile bar) open the ticket modal
export function TicketModalProvider({ event, tickets, children }: Props) {
  const [modal, setModal] = useState<{ open: boolean; ticketId?: string }>({ open: false });

  const openTicketModal = (ticketId?: string) => setModal({ open: true, ticketId });

  return (
    <TicketModalContext.Provider value={{ openTicketModal }}>
      {children}

      {/* Mounted only while open, so the form resets every time */}
      {modal.open && (
        <TicketModal
          event={event}
          tickets={tickets}
          initialTicketId={modal.ticketId}
          onClose={() => setModal({ open: false })}
        />
      )}
    </TicketModalContext.Provider>
  );
}

export const useTicketModal = () => {
  const context = useContext(TicketModalContext);
  if (!context) throw new Error("useTicketModal must be used inside TicketModalProvider");
  return context;
};
