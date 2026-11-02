import { ReactNode } from "react";
import Image from "next/image";
import { HERO_IMAGE } from "@/data/events";

type Props = {
  title: string;
  subtitle?: string;
  image?: string;
  children: ReactNode;
};

const HIGHLIGHTS = [
  { icon: "bi-qr-code", text: "Digital tickets with unique QR codes" },
  { icon: "bi-shield-check", text: "Secure checkout and payments" },
  { icon: "bi-arrow-left-right", text: "Transfer or resell eligible tickets" },
];

// Shared split layout for Login / Register / Forgot Password
export default function AuthLayout({
  title,
  subtitle,
  image = HERO_IMAGE,
  children,
}: Props) {
  return (
    <section className="cc-section-alt py-5">
      <div className="container py-lg-4">
        <div className="cc-auth-card row g-0 mx-auto overflow-hidden">
          {/* Brand side (desktop only) */}
          <div className="col-lg-6 d-none d-lg-block position-relative">
            <Image
              src={image}
              alt=""
              fill
              sizes="(min-width: 992px) 640px, 0px"
              className="object-fit-cover"
            />
            <div className="cc-auth-aside position-relative h-100 d-flex flex-column justify-content-end p-5">
              <h2 className="display-6 fw-bold text-white mb-3">
                Every Event. Every Connection.
              </h2>
              <p className="text-white opacity-75 mb-4">
                Discover concerts, festivals, conferences and live experiences
                — all your tickets in one place.
              </p>
              <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                {HIGHLIGHTS.map((item) => (
                  <li key={item.text} className="d-flex align-items-center gap-3 text-white">
                    <span className="cc-auth-aside-icon flex-shrink-0">
                      <i className={`bi ${item.icon}`} />
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form side */}
          <div className="col-12 col-lg-6 bg-white">
            <div className="p-4 p-sm-5 mx-auto cc-auth-form">
              <h1 className="h2 fw-bold mb-2">{title}</h1>
              {subtitle && <p className="text-body-secondary mb-4">{subtitle}</p>}
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
