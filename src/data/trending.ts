import { CATEGORIES } from "./categories";
import { EVENTS } from "./events";

// Demo ranking: most attendees first (will come from API: bookings + views)
export const TRENDING_EVENTS = [...EVENTS].sort((a, b) => b.attendees - a.attendees);

export const TRENDING_RANGES = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
] as const;

// Demo growth numbers for "hot categories"
export const HOT_CATEGORIES = [...CATEGORIES]
  .sort((a, b) => b.eventCount - a.eventCount)
  .slice(0, 4)
  .map((category, index) => ({
    ...category,
    growth: [42, 35, 28, 21][index],
  }));

export const TRENDING_STATS = [
  { icon: "bi-arrow-repeat", label: "Updated daily" },
  { icon: "bi-graph-up-arrow", label: "Based on bookings & views" },
];
