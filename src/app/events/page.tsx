import type { Metadata } from "next";
import EventsPage from "@/containers/Events";

export const metadata: Metadata = {
  title: "Discover Events – CrowdCircuit",
  description:
    "Browse concerts, festivals, conferences, sports and more. Filter by category, city, date and price.",
};

export default function Events() {
  return <EventsPage />;
}
