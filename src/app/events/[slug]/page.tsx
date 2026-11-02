import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventDetailsPage from "@/containers/EventDetails";
import { getEventBySlug, getEventDetails, getRelatedEvents } from "@/data/eventDetails";
import { EVENTS } from "@/data/events";

type Props = {
  params: Promise<{ slug: string }>;
};

// Pre-render a page for every demo event
export function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Event not found – CrowdCircuit" };

  return {
    title: `${event.title} – CrowdCircuit`,
    description: `${event.title} at ${event.venue}, ${event.city}. Book your tickets on CrowdCircuit.`,
  };
}

export default async function EventDetails({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return (
    <EventDetailsPage
      event={event}
      details={getEventDetails(event)}
      relatedEvents={getRelatedEvents(event)}
    />
  );
}
