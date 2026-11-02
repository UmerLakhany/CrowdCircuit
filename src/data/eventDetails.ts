import { EVENTS, type EventItem } from "./events";

export type TicketType = {
  id: string;
  name: string;
  price: number;
  total: number;
  remaining: number;
  perks: string[];
};

export type Organizer = {
  name: string;
  initials: string;
  verified: boolean;
  eventsHosted: number;
  followers: number;
  bio: string;
};

export type EventDetails = {
  description: string[];
  highlights: string[];
  endTime?: string;
  address: string;
  ageRestriction: string;
  organizer: Organizer;
  tickets: TicketType[];
  rules: string[];
};

const DEFAULT_RULES = [
  "Please carry a valid CNIC or student ID along with your digital ticket.",
  "Each QR ticket is valid for one-time entry only.",
  "Outside food, drinks and sharp objects are not allowed.",
  "Tickets are non-refundable unless the event is cancelled or rescheduled.",
  "The organizer reserves the right to admission.",
];

// Demo data – full details for the flagship event, the rest are generated
const DETAILS_BY_SLUG: Record<string, EventDetails> = {
  "karachi-music-festival-2026": {
    description: [
      "Experience an unforgettable evening featuring live performances, talented musicians, and an energetic festival atmosphere.",
      "Karachi Music Festival brings together the country's top artists and rising stars for one night of non-stop music by the sea. Enjoy multiple stages, food stalls, art installations and a spectacular light show to close the night.",
    ],
    highlights: [
      "10+ live performances across 2 stages",
      "Food court with 20+ local vendors",
      "Light & fireworks show at the finale",
      "Free parking and shuttle service",
    ],
    endTime: "11:00 PM",
    address: "Seaview Events Arena, Abdullah Shah Ghazi Road, Clifton, Karachi",
    ageRestriction: "16+ (under 18 must be accompanied by an adult)",
    organizer: {
      name: "SoundWave Productions",
      initials: "SW",
      verified: true,
      eventsHosted: 48,
      followers: 12500,
      bio: "Pakistan's leading live music and festival organizer, creating unforgettable experiences since 2015.",
    },
    tickets: [
      {
        id: "general",
        name: "General Admission",
        price: 2000,
        total: 3000,
        remaining: 1240,
        perks: ["Standing access to both stages", "Food court access"],
      },
      {
        id: "premium",
        name: "Premium",
        price: 4000,
        total: 800,
        remaining: 210,
        perks: ["Front-section standing area", "Fast-track entry", "1 complimentary drink"],
      },
      {
        id: "vip",
        name: "VIP Experience",
        price: 8000,
        total: 200,
        remaining: 24,
        perks: ["VIP lounge & seating", "Meet & greet with artists", "Free food & drinks", "Exclusive merch pack"],
      },
    ],
    rules: DEFAULT_RULES,
  },
};

const buildDefaultDetails = (event: EventItem): EventDetails => ({
  description: [
    `Join us for ${event.title} at ${event.venue}, ${event.city}. An experience packed with great energy, amazing people and memories worth keeping.`,
    "Secure your tickets early — popular ticket types sell out fast.",
  ],
  highlights: [
    `Hosted at ${event.venue}`,
    `${event.category} experience`,
    "Digital QR tickets for quick entry",
    "Secure online booking",
  ],
  address: `${event.venue}, ${event.city}, Pakistan`,
  ageRestriction: "All ages welcome",
  organizer: {
    name: "CrowdCircuit Events",
    initials: "CC",
    verified: true,
    eventsHosted: 120,
    followers: 25000,
    bio: "Official CrowdCircuit events team bringing you the best experiences across Pakistan.",
  },
  tickets: [
    {
      id: "general",
      name: "General Admission",
      price: event.price,
      total: 1000,
      remaining: 300 + ((event.id * 97) % 600),
      perks: ["Standard entry", "Access to main area"],
    },
    {
      id: "premium",
      name: "Premium",
      price: event.price * 2,
      total: 300,
      remaining: 40 + ((event.id * 53) % 200),
      perks: ["Priority seating / standing", "Fast-track entry"],
    },
    {
      id: "vip",
      name: "VIP Experience",
      price: event.price * 4,
      total: 80,
      remaining: 5 + ((event.id * 31) % 40),
      perks: ["VIP lounge access", "Complimentary refreshments", "Exclusive merch"],
    },
  ],
  rules: DEFAULT_RULES,
});

export const getEventBySlug = (slug: string) =>
  EVENTS.find((event) => event.slug === slug);

export const getEventDetails = (event: EventItem): EventDetails =>
  DETAILS_BY_SLUG[event.slug] ?? buildDefaultDetails(event);

// Same category first, then same city, excluding the current event
export const getRelatedEvents = (event: EventItem, limit = 4) => {
  const others = EVENTS.filter((item) => item.id !== event.id);
  const score = (item: EventItem) =>
    (item.category === event.category ? 2 : 0) + (item.city === event.city ? 1 : 0);
  return [...others].sort((a, b) => score(b) - score(a)).slice(0, limit);
};

// Booking rules (demo values)
export const SERVICE_CHARGE_RATE = 0.05; // 5% of subtotal
export const MAX_TICKETS_PER_TYPE = 10;
