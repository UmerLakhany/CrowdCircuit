export type Category = {
  name: string;
  slug: string;
  icon: string;
  eventCount: number;
};

// Demo data
export const CATEGORIES: Category[] = [
  { name: "Music & Concerts", slug: "music", icon: "bi-music-note-beamed", eventCount: 124 },
  { name: "Festivals", slug: "festivals", icon: "bi-stars", eventCount: 48 },
  { name: "Sports", slug: "sports", icon: "bi-trophy", eventCount: 36 },
  { name: "Technology & Innovation", slug: "technology", icon: "bi-cpu", eventCount: 52 },
  { name: "Business & Networking", slug: "business", icon: "bi-briefcase", eventCount: 41 },
  { name: "Arts & Culture", slug: "arts", icon: "bi-palette", eventCount: 67 },
  { name: "Food & Lifestyle", slug: "food", icon: "bi-cup-hot", eventCount: 39 },
  { name: "Education & Workshops", slug: "education", icon: "bi-mortarboard", eventCount: 58 },
];

export const CITIES = ["Karachi", "Lahore", "Islamabad"];
