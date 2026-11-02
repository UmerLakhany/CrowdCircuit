export const route = {
  // Main
  home: "/",
  events: "/events",
  eventDetails: (slug: string) => `/events/${slug}`,
  categories: "/categories",
  categoryDetails: (slug: string) => `/categories/${slug}`,
  trending: "/trending",
  myTickets: "/my-tickets",
  favorites: "/favorites",
  resale: "/resale",

  // Auth
  login: "/auth/login",
  register: "/auth/register",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  verifyEmail: "/auth/verify-email",

  // Company
  about: "/about",
  contact: "/contact",

  // Support
  help: "/help",
  faq: "/faq",
  support: "/support",
  refunds: "/support/refunds",

  // Legal
  terms: "/terms",
  privacy: "/privacy",
};
