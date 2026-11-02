import { unsplash } from "@/utils/images";

export type Category = {
  name: string;
  slug: string;
  icon: string;
  eventCount: number;
  description: string;
  image: string;
};

// Demo data
export const CATEGORIES: Category[] = [
  {
    name: "Music & Concerts",
    slug: "music",
    icon: "bi-music-note-beamed",
    eventCount: 124,
    description: "Live gigs, concerts and music nights from top artists.",
    image: unsplash("1501281668745-f7f57925c3b4", 700),
  },
  {
    name: "Festivals",
    slug: "festivals",
    icon: "bi-stars",
    eventCount: 48,
    description: "Celebrations, carnivals and big-crowd festival experiences.",
    image: unsplash("1492684223066-81342ee5ff30", 700),
  },
  {
    name: "Sports",
    slug: "sports",
    icon: "bi-trophy",
    eventCount: 36,
    description: "Matches, marathons and tournaments to cheer for.",
    image: unsplash("1452626038306-9aae5e071dd3", 700),
  },
  {
    name: "Technology & Innovation",
    slug: "technology",
    icon: "bi-cpu",
    eventCount: 52,
    description: "Tech summits, product launches and innovation talks.",
    image: unsplash("1540575467063-178a50c2df87", 700),
  },
  {
    name: "Business & Networking",
    slug: "business",
    icon: "bi-briefcase",
    eventCount: 41,
    description: "Expos, conferences and meetups to grow your network.",
    image: unsplash("1511578314322-379afb476865", 700),
  },
  {
    name: "Arts & Culture",
    slug: "arts",
    icon: "bi-palette",
    eventCount: 67,
    description: "Exhibitions, theatre, heritage and creative showcases.",
    image: unsplash("1513364776144-60967b0f800f", 700),
  },
  {
    name: "Food & Lifestyle",
    slug: "food",
    icon: "bi-cup-hot",
    eventCount: 39,
    description: "Food festivals, tastings and lifestyle pop-ups.",
    image: unsplash("1555939594-58d7cb561ad1", 700),
  },
  {
    name: "Education & Workshops",
    slug: "education",
    icon: "bi-mortarboard",
    eventCount: 58,
    description: "Hands-on workshops, classes and learning sessions.",
    image: unsplash("1524178232363-1fb2b075b655", 700),
  },
];

export const CITIES = ["Karachi", "Lahore", "Islamabad"];

export const getCategoryBySlug = (slug: string) =>
  CATEGORIES.find((category) => category.slug === slug);
