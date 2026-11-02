export type NavLink = {
  label: string;
  href: string;
  icon: string;
};

export const MAIN_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", icon: "bi-house-door" },
  { label: "Discover Events", href: "/events", icon: "bi-compass" },
  { label: "Categories", href: "/categories", icon: "bi-grid" },
  { label: "Trending", href: "/trending", icon: "bi-fire" },
  { label: "My Tickets", href: "/my-tickets", icon: "bi-ticket-perforated" },
  { label: "Favorites", href: "/favorites", icon: "bi-heart" },
];

export const AUTH_LINKS = {
  login: "/auth/login",
  register: "/auth/register",
};
