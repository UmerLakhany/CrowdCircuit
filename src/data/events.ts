export type EventItem = {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string; // YYYY-MM-DD
  time: string;
  city: string;
  venue: string;
  price: number; // starting price in PKR
  image: string;
  attendees: number;
  featured?: boolean;
  trending?: boolean;
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const HERO_IMAGE = unsplash("1506157786151-b8491531f063");

// Background images for inner page banners
export const PAGE_HEADER_IMAGES = {
  events: unsplash("1470229722913-7c0e2dbbafd3"),
};

// Side images for auth pages
export const AUTH_IMAGES = {
  login: unsplash("1501281668745-f7f57925c3b4"),
  register: unsplash("1429962714451-bb934ecdc4ec"),
  forgotPassword: unsplash("1514525253161-7a46d19cd819"),
  resetPassword: unsplash("1459749411175-04bf5292ceea"),
  verifyEmail: unsplash("1475721027785-f74eccf877e2"),
};

// Demo data – will come from the API later
export const EVENTS: EventItem[] = [
  {
    id: 1,
    slug: "karachi-music-festival-2026",
    title: "Karachi Music Festival 2026",
    category: "Music & Concerts",
    date: "2026-12-12",
    time: "6:00 PM",
    city: "Karachi",
    venue: "Seaview Events Arena",
    price: 2000,
    image: unsplash("1470229722913-7c0e2dbbafd3"),
    attendees: 4800,
    featured: true,
    trending: true,
  },
  {
    id: 2,
    slug: "future-of-technology-summit",
    title: "The Future of Technology Summit",
    category: "Technology & Innovation",
    date: "2026-12-18",
    time: "10:00 AM",
    city: "Karachi",
    venue: "Expo Centre Hall 2",
    price: 3500,
    image: unsplash("1540575467063-178a50c2df87"),
    attendees: 1900,
    featured: true,
  },
  {
    id: 3,
    slug: "live-jazz-under-the-stars",
    title: "Live Jazz Under the Stars",
    category: "Music & Concerts",
    date: "2026-12-20",
    time: "8:00 PM",
    city: "Lahore",
    venue: "Alhamra Open Air Theatre",
    price: 2500,
    image: unsplash("1415201364774-f6f0bb35f28f"),
    attendees: 1200,
    featured: true,
    trending: true,
  },
  {
    id: 4,
    slug: "pakistan-business-innovation-expo",
    title: "Pakistan Business & Innovation Expo",
    category: "Business & Networking",
    date: "2027-01-10",
    time: "11:00 AM",
    city: "Islamabad",
    venue: "Jinnah Convention Centre",
    price: 1000,
    image: unsplash("1511578314322-379afb476865"),
    attendees: 3100,
    featured: true,
  },
  {
    id: 5,
    slug: "winter-food-culture-festival",
    title: "Winter Food & Culture Festival",
    category: "Food & Lifestyle",
    date: "2026-12-25",
    time: "4:00 PM",
    city: "Karachi",
    venue: "Beach View Park",
    price: 1500,
    image: unsplash("1555939594-58d7cb561ad1"),
    attendees: 6200,
    trending: true,
  },
  {
    id: 6,
    slug: "new-year-countdown-party",
    title: "New Year Countdown Party",
    category: "Festivals",
    date: "2026-12-31",
    time: "9:00 PM",
    city: "Islamabad",
    venue: "F-9 Park Grounds",
    price: 3000,
    image: unsplash("1492684223066-81342ee5ff30"),
    attendees: 8500,
    trending: true,
  },
  {
    id: 7,
    slug: "sufi-night-live",
    title: "Sufi Night Live",
    category: "Music & Concerts",
    date: "2026-11-28",
    time: "8:30 PM",
    city: "Lahore",
    venue: "Lahore Fort Courtyard",
    price: 1800,
    image: unsplash("1493225457124-a3eb161ffa5f"),
    attendees: 2700,
  },
  {
    id: 8,
    slug: "karachi-coastal-marathon",
    title: "Karachi Coastal Marathon",
    category: "Sports",
    date: "2026-11-22",
    time: "6:00 AM",
    city: "Karachi",
    venue: "Sea View Promenade",
    price: 1200,
    image: unsplash("1452626038306-9aae5e071dd3"),
    attendees: 3400,
  },
  {
    id: 9,
    slug: "lahore-arts-heritage-week",
    title: "Lahore Arts & Heritage Week",
    category: "Arts & Culture",
    date: "2026-11-15",
    time: "12:00 PM",
    city: "Lahore",
    venue: "National College of Arts",
    price: 800,
    image: unsplash("1513364776144-60967b0f800f"),
    attendees: 1500,
  },
  {
    id: 10,
    slug: "startup-pitch-night",
    title: "Startup Pitch Night",
    category: "Business & Networking",
    date: "2026-11-19",
    time: "7:00 PM",
    city: "Islamabad",
    venue: "NIC Islamabad",
    price: 1000,
    image: unsplash("1531058020387-3be344556be6"),
    attendees: 650,
  },
  {
    id: 11,
    slug: "creative-design-workshop",
    title: "Creative Design Workshop",
    category: "Education & Workshops",
    date: "2026-11-26",
    time: "2:00 PM",
    city: "Lahore",
    venue: "Arfa Tower Auditorium",
    price: 2200,
    image: unsplash("1524178232363-1fb2b075b655"),
    attendees: 300,
  },
  {
    id: 12,
    slug: "electro-night-karachi",
    title: "Electro Night Karachi",
    category: "Festivals",
    date: "2026-12-05",
    time: "9:00 PM",
    city: "Karachi",
    venue: "Port Grand",
    price: 3500,
    image: unsplash("1533174072545-7a4b6ad7a6c3"),
    attendees: 5200,
    trending: true,
  },
];

export const HOME_STATS = [
  { value: "1,200+", label: "Live Events" },
  { value: "50K+", label: "Happy Attendees" },
  { value: "25+", label: "Cities" },
  { value: "4.9", label: "Average Rating" },
];
