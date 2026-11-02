import { MAIN_NAV_LINKS } from "./navigation";
import { route } from "./routes";

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

export type ContactItem = {
  icon: string;
  text: string;
  href?: string;
};

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Explore",
    links: MAIN_NAV_LINKS.filter((link) => link.href !== route.home).map(
      ({ label, href }) => ({ label, href })
    ),
  },
  {
    title: "Company",
    links: [
      { label: "About CrowdCircuit", href: route.about },
      { label: "Contact Us", href: route.contact },
      { label: "Resale Marketplace", href: route.resale },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: route.help },
      { label: "FAQs", href: route.faq },
      { label: "Refund Requests", href: route.refunds },
      { label: "Submit a Request", href: route.support },
    ],
  },
];

// TODO: replace with real profile URLs
export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Facebook", href: "#", icon: "bi-facebook" },
  { label: "Instagram", href: "#", icon: "bi-instagram" },
  { label: "X", href: "#", icon: "bi-twitter-x" },
  { label: "LinkedIn", href: "#", icon: "bi-linkedin" },
  { label: "YouTube", href: "#", icon: "bi-youtube" },
];

// TODO: replace with real contact details
export const CONTACT_INFO: ContactItem[] = [
  {
    icon: "bi-envelope",
    text: "info@crowdcircuit.com",
    href: "mailto:info@crowdcircuit.com",
  },
  { icon: "bi-telephone", text: "+92 300 0000000", href: "tel:+923000000000" },
  { icon: "bi-geo-alt", text: "Karachi, Pakistan" },
];

export const LEGAL_LINKS: FooterLink[] = [
  { label: "Terms & Conditions", href: route.terms },
  { label: "Privacy Policy", href: route.privacy },
];
