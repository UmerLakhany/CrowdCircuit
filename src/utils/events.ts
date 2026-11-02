import { CATEGORIES } from "@/data/categories";
import { EVENTS, type EventItem } from "@/data/events";
import { PRICE_STEP } from "@/data/eventFilters";

// Highest event price rounded up to the slider step (used as slider max)
export const MAX_EVENT_PRICE =
  Math.ceil(Math.max(...EVENTS.map((event) => event.price)) / PRICE_STEP) * PRICE_STEP;

const getCategorySlug = (categoryName: string) =>
  CATEGORIES.find((category) => category.name === categoryName)?.slug;

// Number of events per category slug (for filter counts)
export const countEventsByCategory = (events: EventItem[] = EVENTS) =>
  events.reduce<Record<string, number>>((counts, event) => {
    const slug = getCategorySlug(event.category);
    if (slug) counts[slug] = (counts[slug] ?? 0) + 1;
    return counts;
  }, {});
