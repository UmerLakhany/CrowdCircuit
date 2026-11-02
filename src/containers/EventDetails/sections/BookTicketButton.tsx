"use client";

import { ReactNode } from "react";
import { useTicketModal } from "../TicketModalContext";

type Props = {
  ticketId?: string;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
};

// Opens the ticket modal (optionally with one ticket type pre-selected)
export default function BookTicketButton({ ticketId, className = "", disabled, children }: Props) {
  const { openTicketModal } = useTicketModal();

  return (
    <button
      type="button"
      className={className}
      onClick={() => openTicketModal(ticketId)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
