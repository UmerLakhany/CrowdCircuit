import { route } from "./routes";

export type NavLink = {
  label: string;
  href: string;
  icon: string;
};

export const MAIN_NAV_LINKS: NavLink[] = [
  { label: "Home", href: route.home, icon: "bi-house-door" },
  { label: "Discover Events", href: route.events, icon: "bi-compass" },
  { label: "Categories", href: route.categories, icon: "bi-grid" },
  { label: "Trending", href: route.trending, icon: "bi-fire" },
  { label: "My Tickets", href: route.myTickets, icon: "bi-ticket-perforated" },
  { label: "Favorites", href: route.favorites, icon: "bi-heart" },
];

export const AUTH_LINKS = {
  login: route.login,
  register: route.register,
};
